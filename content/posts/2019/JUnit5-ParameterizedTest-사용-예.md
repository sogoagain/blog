---
path: "junit5-parameterizedtest"
date: "2019-06-17"
title: "JUnit5, @ParameterizedTest 사용 예"
subtitle: "하나의 테스트 메서드에 여러 테스트 케이스 수행하기"
tags: ["테스트"]
---

# JUnit5에서 ParameterizedTest를 사용하여 여러번의 테스트 케이스 수행하기

- 테스트 메서드에 입력값만 전달할 경우

```java
@ParameterizedTest
@ValueSource(strings = {
        "123",
        "1 - 2",
        "1 + 2 + 3",
        "2 + 3 * 4 / 2",
        "1343 + 231 * 2 / 4",
})
void 올바른_형식의_수식으로_다항식_생성_테스트(String expression) {
  Polynomial polynomial = Polynomial.createPolynomialWithExpression(expression);
  assertThat(polynomial).isInstanceOf(Polynomial.class);
}
```

- 테스트 메서드에 입력값 뿐만 아니라 결과값도 전달할 필요가 있을 때

```java
@ParameterizedTest
@CsvSource({
        "'1 - 2', -1",
        "'1 + 2 + 3', 6"
})
void 다항식_연산_수행_테스트(String expression, int expectedResult) {
  Polynomial polynomial = Polynomial.createPolynomialWithExpression(expression);
  assertThat(polynomial.calculate()).isEqualTo(expectedResult);
}
```
