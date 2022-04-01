---
path: "https-using-mkcert"
date: "2020-12-04"
title: "mkcert를 이용한 localhost HTTPS(TLS) 설정"
subtitle: "Local 환경에 CA를 구성하고 인증서를 발급해보자"
---

최근 인증 관련 API를 개발하고 있는데, 해당 인증 Spec이 Https 프로토콜 위에서 작동되어야 한다.
따라서, 개발을 하려면 localhost 도메인으로 https 통신을 할 수 있어야 한다. 이 말은 로컬 환경에 TLS 구성을 해야 한다는 뜻이다. 얼핏 생각하기에 많은 작업이 필요할 것 같지만 mkcert라는 도구를 활용하면 그리 어렵진 않다.

## [mkcert](https://github.com/FiloSottile/mkcert) 설치 및 인증서 발급

Mac OS 기준으로 작성하였다. 다른 OS는 공식 문서를 참고하면 된다.

### 1. 설치

```bash
$ brew install mkcert
```

### 2. Local 환경에 [CA(Certificate authority)](https://en.wikipedia.org/wiki/Certificate_authority) 생성

- CA란 인증서를 발급하는 하나의 단위로 인증서에 대한 정보를 제공하는 역할도 한다.
- 다음 단계에서 인증서를 생성하는데 이 때 생성되는 인증서가 이번 단계에서 생성한 CA가 발급하는 것이 된다.

```bash
$ mkcert -install
```

### 3. [PKCS #12(Public-Key Cryptography Standards)](https://en.wikipedia.org/wiki/PKCS_12) 인증서 생성

- PKCS #12는 인증서와 개인키를 모두 담고 있는 파일이며 패스워드로 암호화 되어 있다. 바이너리 형식으로 저장되며 .pfx, p.12 등의 확장자를 갖는다.
- 인증서를 생성할 때는 원하는 서버 애플리케이션에서 사용할 수 있도록 경로와 이름을 지정한다.
- 생성된 인증서의 기본 암호는 'changeit'이다.

```bash
$ mkcert -pkcs12 -p12-file keystore.p12 localhost
```

### 4. 생성된 인증서 사용 (예, SpringBoot)

- 생성된 인증서는 개발하는 애플리케이션에서 알아서(?) 사용해야 한다.
- SpringBoot에서는 생성된 인증서를 'src/main/resources' 경로로 옮겨준 뒤 아래와 같이 application.properties 파일을 작성하면 ssl 환경이 구성된다.
- 서버를 구동한 뒤 '[https://localhost:8443/](https://localhost:8443/)'로 접속하여 TLS 설정이 잘 되었는지 확인하면 끝이다.

```
server.port=8443
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-type=PKCS12
server.ssl.key-store-password=changeit
```

## 참고) HTTPS 접속 이후 HTTP 접속 redirect 문제

### 현상

- 브라우저를 이용해 단 한번이라도 https://localhost로 접속하면 이후부터 http://localhost가 https로 redirect되어 다른 애플리케이션 개발에 차질이 발생한다.

### 원인

- 이러한 현상은 [HSTS(HTTP Strict Transport Security)](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) 때문에 발생한다.
- 사용자가 https로 특정 도메인에 요청을 보내면 웹 서버는 요청에 대한 응답 헤더에 HSTS 설정과 관련된 'Strict-Transport-Security' 정보를 포함하여 응답을 내려준다. 브라우저는 이 응답에 포함된 'max-age' 기간 동안 해당 도메인에 대해서는 HTTPS로 접속을 강제한다.

### 해결책

- 여러가지 해결 책이 있지만 개발자 도구를 이용해 '캐시 비우기 및 강제 새로고침'을 통해 해결할 수 있다.
- 혹은, http로 통신해야 하는 애플리케이션은 localhost 대신 127.0.0.1로 접속해도 된다. 또 다른 방법으로는 hosts 설정을 통해 애플리케이션 별로 도멘인을 나눌 수도 있다.
