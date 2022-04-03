---
path: "cached-method-with-immutable-object"
date: "2019-12-06"
title: "[실수노트] 캐싱된 메서드는 변경 불가능한(Immutable) 객체를 반환토록 하자"
subtitle: "Spring에서 @Cacheable을 사용할 때 주의할 점"
---

## 상황

호출될 때마다 같은 값을 반환할 것으로 기대되는 Service의 한 메서드를 캐싱 처리 하였다. 캐싱 처리한 메서드는 카테고리 데이터를 DB에서 가져와 리스트 형태로 반환하는 메서드였다. 카테고리 데이터가 자주 바뀌지 않아 긴시간 동안 같은 결과값을 반환하는데 매번 DB를 조회하는 것은 리소스를 낭비하는 것이기에 캐싱 처리를 하였다.

그런데, 배포를 하고보니 데이터 출력이 이상했다. 특정 화면에서 카테고리를 조회할 때 새로운 카테고리가 생기고 조회를 계속 할수록 새롭게 생긴 카테고리는 중복되어 출력되었다. 여기서 끝이 아니라, 중복되어 생긴 카테고리는 오류가 발생하는 화면에서만 보이는 것이 아니라 카테고리를 조회하는 곳이면 어디서든 출력되고 있었다.

예를들면 \['태블릿', '휴대전화'\] 2개 카테고리만 출력되어야 하는데 \['태블릿, '휴대전화', '이벤트', '이벤트', '이벤트', '이벤트'\]와 같이 출력되는 오류가 발생하였다.

## 문제

캐싱된 메서드는 Service단 메서드로써 아래와 같이 Repository에서 모든 데이터를 가져와 List 형식으로 반환한다.

```java
@Cacheable("categories")
public List<Category> getAll() {
    return categoryRepository.findAll();
}
```

대부분의 경우 Controller단에서는 위 getAll() 메서드로 반환된 List를 변경없이 사용하여 Client단으로 내려주었는데 이 경우에는 문제가 발생하지 않았다.

```java
@GetMapping("")
public Header<List<Category>> readAll() {
    final List<Category> categories = categoryService.getAll();
    return Header.OK(categories);
}
```

호출될 때 마다 특정 카테고리가 중복으로 생기는 페이지에서 호출하는 api를 따라가보니 아래와 같이 Controller가 작성되어 있었다. getAll()메서드로 반환된 List에 데이터를 추가하여 Client단으로 내려주고 있었다.

```java
@GetMapping("")
public Header<List<Category>> readAllWithEventCategory() {
    final List<Category> categories = categoryService.getAll();
    final Category eventCategory = Category.createEventCategory();
    categories.add(eventCategory);

    return Header.OK(categories);
}
```

문제의 원인은 이곳에 있었다. 이전까지는 CategoryService의 getAll()을 호출하게 되면 그때 마다 db에 접근하여 새롭게 List를 만들어 반환하였다. 그렇기 때문에 List에 담긴 데이터 정보는 동일하겠지만 각 호출시 반환받은 List는 서로 다른 객체였다. 그러나 CategoryService의 getAll()을 캐싱처리 하면서 한 번 호출된 결과를 메모리 상에 가지고 있다가 다음번 호출 때 메모리 상에 저장해둔 List 객체를 반환하게 되었다. 즉 캐싱처리를 하면서 CategoryService의 getAll()을 호출하는 곳이면 메모리 상에 같은 주소를 가리키는 같은 List 객체를 반환받게 되었다.

이를 확인하고자 아래의 간단한 테스트 코드를 작성하였다. 메서드를 캐싱처리 하였을 때 아래의 테스트 코드는 정상적으로 통과했지만 캐싱처리를 하지 않았을 때는 통과하지 못했다.

```java
@SpringBootTest
public class CategoryServiceTest {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    @DisplayName("캐싱된 getAll()로 반환받은 리스트 객체는 동일하다.")
    void getAll_WithCaching_isSame() {
        final List<Category> firstList = categoryService.getAll();
        final List<Category> secondList = categoryService.getAll();

        assertThat(firstList).isEqualTo(secondList);
    }
}
```

이렇게 CategoryService의 getAll() 메서드를 호출하는 곳에서는 동일한 List 객체를 반환받다 보니 어느 한곳에서라도 반환받은 List에 데이터를 추가하거나 삭제 혹은 변경해버리면 그 여파가 getAll() 메서드를 호출하는 모든 곳으로 전파되버린다. 이 또한 아래의 테스트 코드로 검증할 수 있다. getAll() 메서드를 캐싱하지 않으면 아래의 테스트 케이스는 실패한다. 즉, getAll()을 호출할 때마다 새로운 리스트가 만들어져 반환되기 때문에 firstList와 secondList의 데이터 갯수가 다르다. 그러나 getAll() 메서드를 캐싱처리하면 테스트 케이스는 통과한다.

```java
@Test
@DisplayName("캐싱된 getAll()로 반환받은 리스트에 데이터를 추가하면 이후 호출된 결과에도 데이터가 추가된 리스트가 반환된다.")
void getAll_AddingCategoryToList_AddedListIsReturned() {
    final Category tempCategory = Category.builder().id(-1L).type("TEMP").title("임시").build();
    final List<Category> firstList = categoryService.getAll();
    firstList.add(tempCategory);

    final List<Category> secondList = categoryService.getAll();

    assertThat(firstList.size()).isEqualTo(secondList.size());
}
```

즉, 내가 겪은 상황의 경우 Controller의 readAllWithEventCategory() 요청이 호출될 때 마다 'eventCategory'라는 임시 객체를 메모리 상에 캐싱된 리스트 객체에 추가해버리니 호출 횟수만큼 List에는 'eventCategory'가 중복되어 추가되었고 CategoryService의 getAll()를 호출하는 모든 곳에서 문제가 발생하였다.

## 해결책

캐싱된 메서드는 변경 불가능한(Immutable) 객체를 반환하도록 정의한다. List의 경우에 아래 코드와 같이 Collections.unmodifiableList 메서드를 통해 데이터 추가/삭제/변경이 제한되는 List로 만들어 반환토록 한다.

```java
@Cacheable("categories")
public List<Category> getAll() {
    return Collections.unmodifiableList(categoryRepository.findAll());
}
```

UnmodifiableCollection의 경우 add, remove 메서드와 같이 저장된 데이터를 변경하고자 하면 'UnsupportedOperationException'를 발생시키기 때문에 이를 사용하는 곳에선 데이터 변경이 불가능하다. 따라서 위에서 오류를 발생시킨 Controller의 경우에 코드를 아래와 같이 수정해야한다. categoryService.getAll()로 반환받은 리스트를 바탕으로 categoriesWithEvent 리스트를 새롭게 생성한다. 그리고 List의 데이터 추가 삭제는 새롭게 생성한 categoriesWithEvent에서 이루어 지도록 한다.

```java
@GetMapping("")
public Header<List<Category>> readAllWithEventCategory() {
    final List<Category> categories = categoryService.getAll();
    final Category eventCategory = Category.createEventCategory();

    final List<Category> categoriesWithEvent = new ArrayList<>(categories);
    categoriesWithEvent.add(eventCategory);

    return Header.OK(categories);
}
```

## 실천방안

메서드 캐싱은 항상 같은 결과값을 반환하는 것으로 기대되는 곳에서만 사용하도록 하며 캐싱된 메서드에서는 변경 불가능한 객체(Immutable)를 반환하도록 정의한다. 또한 캐싱된 메서드의 반환값에 대해서 변경이 필요하다면 꼭 필요한 변경인지, 변경을 우회할 수 있는 더 좋은 방법은 없는지 고민해본다.
