---
path: "uri-components-builder"
date: "2020-10-25"
title: "UriComponentsBuilder로 URI 생성하는 방법"
subtitle: "Controller에서 URI 작업을 할 때 UriComponentsBuilder를 사용하자"
---

# Controller에서 URI을 불러와 작업하는 경우

Controller에서 결과를 반환할 때 URI와 관련된 작업이 필요할 때가 있다. 대표적인 예로 POST 요청에서 Resource를 새로 생성한 경우를 들 수 있겠다. 이 경우 반환할 때 Header의 Location에 새로 생성한 Resource의 URI를 포함시켜 결과를 반환해야 한다.

## 기존에 사용하던 방법

기존에는 'java.net.URI' 클래스를 이용해 URI 객체를 생성한 뒤 이 객체를 Header에 포함시키는 방법을 사용했다. 이 방법에 큰 문제가 있는 것은 아니지만, URISyntaxException을 직접 처리해주어야 하는 번거로움이 있다.

```java
@PostMapping("/items")
public ResponseEntity<?> create(@RequestBody Item resource) throws URISyntaxException {
    final Item item = itemService.addItem(resource.getName());

    final String url = "/items/" + item.getId();
    return ResponseEntity.created(new URI(url)).body("{}");
}
```

## UriComponentsBuilder를 활용하는 방법

최근 업무로 인해 오픈소스 프로젝트를 분석할 일이 생겼다. 분석을 하던 중 위의 방법들을 대체할 좋은 방법을 찾았다. Controller 함수에 UriComponentsBuilder를 주입(Inject) 받아 사용하는 것이다. UriComponentsBuilder는 Spring에서 URI와 관련된 작업을 조금 더 쉽게 할 수 있도록 도와주는 클래스다. 무엇보다 기존 방법에서 처리해주어야 했던 URISyntaxException를 직접처리해주지 않아도 되고, URI 생성 작업이 전보다 쉽고 간결해진다. 예를들어 특정 path에 resource id를 덧붙일 때 UriComponentsBuilder에서 제공하는 buildAndExpand 메서드로 String 템플릿을 이용해 구현할 수 있다.

```java
@PostMapping("/items")
public ResponseEntity<?> create(@RequestBody Item resource, UriComponentsBuilder ucBuilder) {
    final Item item = itemService.addItem(resource.getName());

    final URI uri = ucBuilder.path("/items/{id}").buildAndExpand(item.getId()).toUri();
    return ResponseEntity.created(uri).body("{}");
}
```
