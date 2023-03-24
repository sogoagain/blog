---
path: "http-request-message"
date: "2019-08-03"
title: "HTTP 메시지 - HTTP Requests"
subtitle: "클라이언트가 웹 서버로 보내는 HTTP 요청 메시지"
tags: "HTTP"
---

# HTTP 요청

웹에서 서버와 클라이언트 간 데이터를 주고받기 위해 HTTP 통신 규약을 사용한다. 오늘은 그중 클라이언트가 서버로 요청을 보내 어떤 행위가 일어나게끔 하는 HTTP 메시지 중 하나인 **HTTP 요청 메시지**에 대해 알아보기로 한다.

# HTTP Requests

- 예시

```http
POST /user/create HTTP/1.1
HOST: localhost:8080
Connection-Length: 59
Content-Type: application/x-www-form-urlencoded
Accept: */*

userId=testUser&password=testPassword
```

## 요청 라인 (Request Line)

Http request 메시지의 첫 줄을 요청 라인(Request Line)이라고 부른다. 요청 라인의 첫 번째는 HTTP 메서드(GET, PUT, POST 등)가 작성되며 그 뒤를 따라 URI, 마지막으로 HTTP 버전 정보가 작성된다.

## 요청 헤더 (Request Header)

요청 라인 이후부터 공백 줄 사이까지 요청 헤더(Request Header)라고 부른다. 예시에서 2번째 줄 부터 5번재 줄이 요청 헤더다. 요청 헤더는 HTTP 헤더의 기본 구조를 따르는데 '<필드 이름> : <필드 값>' 쌍으로 이루어져 있다. 필드 이름은 대소문자 구분 없는 문자열이며 필드 값이 여러 개일 경우 ','로 구분한다.

## 요청 본문 (Request Body)

요청 헤더 이후 공백 줄 다음을 요청 헤더(Request Header)라고 부른다. 예시에서는 7번째 줄이 요청 본문에 해당한다. 모든 요청에 본문이 들어가는 것은 아니며 보통 POST 요청 시 요청 본문에 데이터를 적재하여 전송한다. 보통 GET과 같이 리소스를 가져오는 요청은 본문이 필요하지 않다.

# 참고자료

> 1. 박재성, 자바 웹 프로그래밍 Next Step, 로드북(2016), p118~p119
> 2. MDN web docs, [HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
