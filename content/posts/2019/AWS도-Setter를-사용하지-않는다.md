---
path: "aws-also-doesnt-use-setters"
date: "2019-09-25"
title: "AWS도 Setter를 사용하지 않는다"
subtitle: "Getter, Setter의 유해성과 캡슐화에 대해서"
---

# AWS도 Setter를 사용하지 않는다.

## AWS SDK 버전을 '1.11.x'에서 '2.x'로

최근 회사 프로젝트의 AWS SDK(Java) 버전을 '1.11.x'에서 '2.x'으로 올리는 작업을 진행하였다.
사내 시스템에 다량의 Email을 발송하는 기능이 있는데 실행 시간이 오래 걸렸기 때문에 개선이 필요하였다.

메일 발송 기능은 AWS SES 서비스를 사용하고 있었고 실행 시간을 단축하고자 메일 발송 로직 전체를 비동기로 변경하려고 알아보던 중 AWS SDK 버전이 2.x로 들어서면서 Nonblocking I/O를 지원하는 것을 알게 되었고 업데이트를 단행하였다.

> The AWS SDK for Java 2.x utilizes a new, nonblocking SDK architecture built on Netty to support true nonblocking I/O. [(AWS SDK for Java 2.x released)](https://aws.amazon.com/ko/blogs/developer/aws-sdk-for-java-2-x-released/)

시스템에서는 AWS의 SES뿐만 아니라 다른 서비스도 사용하고 있었기에 수정 범위가 꽤 커졌지만, 코드 리팩토링과 함께 AWS SDK가 어떻게 달라졌나를 코드로 느끼며 진행했기에 흥미로운 경험이 되었다.

## '2.x'는 Setter를 사용하지 않는다.

전체적으로 AWS SDK 2.0의 코드는 1.11.x보다 세련되었고 많은 부분이 변화하였다. 그중 내게 눈에 띈 변화는 바로 **Setter를 없앤 사실**이다.

> In the SDK for Java 2.x, setter method names don't include the "set" or "with" prefix. [(What's Different between the SDK for Java 1.11.x and 2.x)](https://docs.aws.amazon.com/en_pv/sdk-for-java/v2/migration-guide/whats-different.html)

생성자 호출 대신 Builder를 통해 객체를 생성하는 등 좋은 변화는 당연히 많았지만 나는 유독 Setter를 없앴다는 사실이 굉장히 반가웠다.

그동안 Setter를 사용하지 않고 프로그램을 작성할 수 있으며 더 좋은 코드를 위해서는 Setter는 사용하지 말아야 한다는 이야기를 종종 하고 다녔다. 하지만, 이 이야기를 하면 대부분 의심의 눈초리와 함께 예시를 요구한다.

사실 내가 예시를 들어도 의심의 눈초리는 쉽게 사그라지지 않는다. 하지만 그 예시가 AWS라면 다를 것이라 생각이 들었다. 이 생각은 정확히 맞아 들었다. 최근 모각코를 함께하는 분들께 AWS SDK 사례와 함께 'Getter, Setter'에 대한 유해성을 말씀드렸더니 큰 관심을 두고 이야기를 들어주었다.

일단 Getter와 Setter에 대해 자세한 이야기를 하기 전에 AWS SDK에서 Setter가 어떻게 없어졌고 Setter 없이 코드를 어떻게 작성하는지 살펴보자.

예를 들어 SDK 1.11.x에서 request를 업데이트하는 코드는 다음과 같았다.

```java
DescribeAlarmsRequest request = new DescribeAlarmsRequest();
DescribeAlarmsResult response = cw.describeAlarms(request);

request.setNextToken(response.getNextToken());
```

하지만, SDK 2.x에서 request를 업데이트 하는 코드는 다음과 같다.

```java
DescribeAlarmsRequest request = DescribeAlarmsRequest.builder().build();
DescribeAlarmsResponse response = cw.describeAlarms(request);

request = DescribeAlarmsRequest.builder()
        .nextToken(new_token)
        .build();
```

SDK 2.x에서는 Setter 메서드를 제공하지 않기 때문에 request에 할당된 객체의 상태를 변경할 수 없다. request를 업데이트 하기 위해서는 객체를 새로 생성하여 할당하는 방법 뿐이다. 즉, 한번 생성된 객체는 변경 불가능한(Immutable POJO) 것이다.

바로 뒤 캡슐화 이야기를 하면서 자세히 설명하겠지만, 변경 불가능한 성질은 request 객체가 외부에서 예상치 못하게 변경될 수 있는 여지 자체를 없애주기 때문에 더욱 견고한 프로그램을 작성할 수 있도록 도와준다.

# Getter, Setter의 유해성

AWS SDK는 왜 Setter를 제공하지 않도록 바뀐 것일까? 이에 대한 답이 우리가 Getter와 Setter를 피해야 하는 이유다.
결론부터 말하면 Getter와 Setter를 사용하는 순간 우리는 **객체지향적** 코드와 멀어지게 되며 객체지향이 주는 장점을 누릴 수 없게 된다.
객체지향적 코드와 멀어진다는 것은 데이터를 직접 조작하는 **절차지향적**으로 프로그램을 작성하게 된다는 것이다.

Getter, Setter의 유해성을 말하기 전에 Getter, Setter가 불필요한 이유를 간단히 살펴보자.
객체 안에 있는 것들을 꺼내서(Getter) 밖에서 처리한 뒤 다시 객체에 넣는(Setter) 행위는 조금만 생각해보면 굉장히 번거로운 작업임을 알 수 있다.
객체 내부에서 바로 처리하면 될 것을 굳이 왜 꺼내고 넣고 해야 하는가. 처리하는 행위를 객체 안에서 하면 'Getter'와 'Setter'는 자연스레 필요가 없어진다.

객체지향적인 사고로는 자연스레 Getter와 Setter가 필요 없는 것이다.
Getter와 Setter가 불필요한 이유 중 이만큼 중요하고 간단한 설명은 없는 것 같다.

조금 더 자세히 들여다보면 Getter와 Setter를 쓴다는 것은 외부에 객체가 어떻게 구현되어 있는지를 드러내는 것이다. 이는 구현을 내부로 숨기는 캡슐화에 어긋나는 것이다. 즉, Getter와 Setter를 사용하게 되면 캡슐화의 장점을 누릴 수 없게 된다.

객체지향은 캡슐화를 통해서 변경의 범위를 객체 내부로 한정 지을 수 있다. 그러나, Getter와 Setter가 사용되는 순간 객체 자신도 모르는 사이 자신의 내부 속성들이 외부 어디선가 사용되게 된다.

이렇게 외부에서 객체의 속성들을 사용하고 변경하는 환경에서 객체의 내부 구현이 변경되면 그 여파가 굉장히 커진다. 그리고 이러한 여파로 기능 추가 및 개선이 어렵게 되며 이는 곧 유지보수 비용이 커지는 결과를 초래한다.

특히, Setter는 Getter보다 더 위험하다. 외부에 객체의 상태를 변경할 방법을 제공하는 것이기 때문에 객체의 상태가 언제 어디서 어떻게 변할지 예측할 수 없다. 복잡한 비즈니스 로직을 제공하는 서비스나 협업하는 상황에서는 setter를 제공하는 객체의 상태 변화에 대한 추적이 더욱 어려워진다.

# 객체가 해야할 일은 객체가 스스로 할 수 있도록 책임을 부여하자

그렇다면 우리는 어떻게 해야 할까? 당연히 앞서 말했다시피 AWS를 본받아 Getter와 Setter가 사용된 로직을 찾고 그 로직을 객체 내부로 옮겨야 한다.
이렇게 객체 외부에서 내부로 옮겨진 로직은 객체가 제공하는 책임이 되며 캡슐화된 로직이 된다.
캡슐화된 로직은 구현 변경에 있어서 유연함이 생긴다. 객체 외부에 존재하던 로직보다 변경의 여파가 적으며 중복된 코드도 줄여줄 수 있다. 또한 코드의 가독성도 올라간다.

## Getter를 제거한 리팩토링 사례

실제로 나는 리팩토링 할 곳을 찾을 때 중점적으로 보는 것 중 하나가 Getter와 Setter가 사용되는 곳이다.

사내 시스템에 데이터를 Excel 형식으로 추출하여 다운받을 수 있는 기능이 있다. 기존에는 Excel로 추출할 수 있는 도메인 각각에 대응되는 Excel 파일 작성 로직이 존재하였다. 즉 A라는 데이터를 추출하기 위한 로직 하나, B라는 데이터를 추출하기 위한 로직 하나 등등 여러 개의 Excel 파일 작성 로직이 존재하였다.

Excel 파일 작성 로직은 도메인 모델의 getter를 호출하여 Excel 파일을 만들고 있었다. 나는 이 로직들을 보고 Getter를 없애자는 목표로 리팩토링을 수행하였다.

먼저 Excel 파일 작성에 필요한 데이터를 나타내는 ExcelData라는 객체를 새로 만들고 Excel로 추출할 수 있는 객체들 내부에서 데이터를 조합하여 ExcelData를 반환토록 하였다. (Getter의 제거)
그리고 Excel로 추출할 수 있는 객체들을 공통된 인터페이스로 묶었다. (추상화/다형성)
그 결과 도메인 별로 1:1 매핑되어 존재하던 Excel 파일 작성 로직을 단 하나로 간추릴 수 있었다.

# Tell, Don't Ask

객체지향 캡슐화와 관련되어 유명한 규칙 중 하나가 'Tell, Don't Ask'다. 객체에게 '넌 뭘 갖고 있니?'라고 묻지 말고 '이것 좀 해줘'라고 말하라는 규칙이다.
객체가 갖고 있는 데이터를 읽는 순간 우리는 객체지향이 아닌 절차지향을 만나게 된다. 객체에 대해서 파고들지 말고 객체를 믿고 객체에게 묻는 것이 객체지향의 출발점이다.
