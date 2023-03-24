---
path: "null-safety-in-kotlin"
date: "2019-08-20"
title: "코틀린(Kotlin)에서의 null 안전 처리"
subtitle: "Kotlin에서 null을 안전하게 처리하는 4가지 방법"
tags: ["Kotlin"]
---

# 코틀린 타입 시스템에서의 null

코틀린의 타입은 기본적으로 null 불가능(non-nullable)이다. 코틀린의 타입 시스템은 코드에서 NPE(NullPointerException)가 발생하지 않도록 설계되었다. 아래의 코틀린 Reference를 살펴보면 NPE가 발생하는 경우가 한정 되어 있다는 것을 확인할 수 있다.

> [Kotlin Reference - Null Safety](https://kotlinlang.org/docs/reference/null-safety.html)

# 명시적 null 타입

코틀린 시스템에서 기본적으로 null이 불가능하도록 강제하고 있지만, 자바와의 상호 운용성 등의 이유로 코틀린에서도 null이 사용되므로 null이 가능한(nullable)한 타입을 제공하고 있다. 일반 타입 뒤에 '?'를 붙이면 null을 할당할 수 있는 타입을 의미한다.

```kotlin
var nonNullableText: String = "null을 할당할 수 없다."
nonNullableText = null // 컴파일 에러

var nullableText: String? = "null을 할당할 수 있다."
nullableText = null // 컴파일 성공
```

# nullable한 타입이 있어도 JAVA 보다는 괜찮다.

위의 예에서 보듯 코틀린의 타입은 기본적으로 non-nullable하므로 명시적 null 타입이 아닌 이상 null을 할당하려고 하면 **컴파일 에러**를 발생시킨다. 자바는 null로 인한 컴파일 에러는 발생하지 않는다. 자바에서의 null 오류는 **런타임 에러**다.

## JAVA보다 낫다지만 null이 가능한데...

위에서 보듯 어찌 되었든 코틀린에서는 null을 할당할 수 있는 타입을 사용할 수 있고 우리는 null에 대비를 해야한다. 우리가 사용하는 라이브러리가 nullable한 타입을 반환할 수 있다. 그럼, 코틀린에서는 어떤 방식으로 null을 안전하게 처리하는지 크게 4가지로 알아보자.

---

# 1. if로 null인지 검사하기

제일 쉽게 떠올릴 수 있는 방법이다. 다른 프로그래밍 언어에서와 마찬가지로 if를 사용해 변수에 null이 할당되었는지 확인하는 방법이다.

```kotlin
var nullableText: String? = null

if (nullableText != null) {
    println(nullableText)
} else {
    println("null입니다.")
}
```

위와 같이 간단한 방법이기는 하나 그리 세련되지는 않은 것 같다. 이후 방법들에서는 코틀린에서 제공하는 연산자를 통해 null을 처리해보자

# 2. double-bang 연산자 (non-null 단언 연산자)

double-bang 연산자라고 불리는 '!!' non-null 단언 연산자를 이용하여 null을 처리할 수 있다. 이 연산자 이름에 단언(assertion)이 붙은것과 형태가 강한 느낌을 주는 느낌표 두개인 것을 통해 유추할 수 있듯이 이 연산자 nullable 변수에 쓰면 다음의 의미를 뜻한다. '비록 nullable 변수이지만 여기에 null이 절대 할당되지 않았음을 내가 단언한다.' 사용은 아래와 같이 한다.

```kotlin
var nullableText: String? = null
val lengthOfText = nullableText!!.length
```

그런데, double-bang 연산자는 치명적인 단점이 있다. 단언한 것 처럼 null이 아니면 상관 없는데, 단언과 다르게 null이 할당되어 있으면 NPE를 발생시킨다. double-bang 연산자는 nullable 타입이 호출할 수 없는 메서드를 강제로 호출하려고 할때 사용되는 느낌이다.

NPE를 발생시킬 수 있으므로 주의 깊게 사용해야 하는데, 미리 어디선가 해당 변수에 대해 null값을 검사하여 null이 절대 할당되지 않는다고 보장될 때 사용하면 될 것 같다.
또는 역발상으로 NPE가 어디서 발생하는지 디버깅 하는 용도로 사용될 수도 있을 것 같다.

# 3. 안전 호출 연산자 (safe call operator)

코틀린에서 nullable한 변수를 처리할 때 가장 자주 사용되는 방법인 것 같다. 안전 호출 연산자는 '?.'이며 null 값을 검사하여 null이면 건너뛰고 null이 아닐 때는 호출된 연산을 실행한다. 사용 방법은 다음과 같다.

```kotlin
var nullableText: String? = null
nullableText = nullableText?.capitalize()
```

> String이 제공하는 메서드 중 capitalize()는 첫글자만 영문 대문자로 변경해준다.

안전 호출 연산자를 사용하면 null 검사 후 null이 아닐 때만 로직을 실행하므로 NPE가 발생하지 않는다.

# 4. Elvis 연산자 (null 복합 연산자)

null 복합 연산자는 '?:' 이다. 연산자 모양이 가수 '엘비스 프레슬리'와 닮았다고 하여 Elvis 연산자라고도 불린다. Elvis 연산자는 Java에서 삼항 연산자로 null을 체크하는 로직을 단축한 것과 유사하다. Elvis 연산자의 왼쪽 피연산자가 null이면 오른쪽 피연산자를 실행하고 아니면 왼쪽 피연산자의 결과를 반환한다. 예로 살펴보자

```kotlin
var nullableText: String? = null
var nonNullableText: String = nullableText ?: "nullableText에 null이 할당되어 이게 반환됩니다."
```

위 예에서 nullableText가 null이므로 오른쪽 피연산자인 "nullableText"가 반환된다. 엘비스 연산자의 동작 방식을 Java의 삼항 연산자로 표현하면 아래와 같다.

```java
String nullableText = null;
String nonNullableText = (nullableText != null ? nullableText : "nullableText에 null이 할당되어 이게 반환됩니다.");
```

---

# 위 4가지 방식 중 어떤 것을 사용해야 할까?

정답은 없고 상황에 따라 다르겠지만 주로 세 번째 방법(안전 호출 연산자)와 네 번째 방법(Elvis 연산자)를 사용하면 보다 kotlin스럽게 코드를 작성할 수 있을 것 같다. 추가적으로 첫 번째 방법으로 소개했던 if로 null을 검사하는 로직도 '안전 호출 연산자', 'Elvis 연산자', 그리고 'let' 함수를 사용하여 동일한 로직을 아래와 같이 표현할 수 있다.

- if로 null 검사하기

```kotlin
var nullableText: String? = null

if (nullableText != null) {
    println(nullableText)
} else {
    println("null입니다.")
}
```

- '안전 호출 연산자', 'Elvis 연산자', 'let' 함수로 동일하게

```kotlin
var nullableText: String? = null

nullableText?.let {
    println(nullableText)
} ?: println("null입니다.")
```

이렇게 if로 null을 검사하는 코드도 kotlin의 방법으로 대체할 수 있으니 되도록이면 kotlin에서 제공하는 방법으로 null을 처리해보는 것이 어떨까?
