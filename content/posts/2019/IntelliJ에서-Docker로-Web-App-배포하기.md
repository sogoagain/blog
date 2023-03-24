---
path: "using-docker-with-intellij"
date: "2019-03-08"
title: "IntelliJ에서 Docker로 Web App 배포하기"
subtitle: "IntelliJ에서 Docker에 올려진 Tomcat으로 배포"
tags: ["Docker"]
---

# WAR artifact 빌드

- Project Settings(⌘;) > Artifacts 메뉴 진입
- (+) 버튼 > Web Application: Archive > For '[Project Name]:war exploded' 클릭
- 생성된 Artifacts의 속성 설정 후 Apply
  - Output Layout에서 '.war' 파일의 파일명이 Context Root 명이 되므로 원하는 Context Root가 있을 경우 .war 파일명을 변경합니다.
  - .war의 기본 파일명은 [Project Name]\_war.war

- Build 메뉴 > Build Artifacts > 위에서 생성한 Artifacts로 빌드

# Docker에 올려진 Tomcat 서버로 배포

- IntelliJ 하단 Docker 윈도우로 이동
  - 사전에 IntelliJ와 Docker를 연결해야 합니다.

- Docker에 있는 Tomcat 이미지 우클릭 > Create container > Create...
- 팝업된 'Create Docker Configuration'에서 컨테이너 정보를 설정

  1. Container name 설정: 차후에 어떤 프로젝트의 컨테이너인지 식별하기 편합니다.

  2. Bind ports

     - Host port: 8080
     - Container port: 8080
     - Host IP: 127.0.0.1

  3. Bind mounts

     - 본 글 첫번째 단계에서 빌드한 WAR artifact과 tomcat 배포 경로를 바인딩합니다.
     - Host path: [PROJECT_PATH]/out/artifacts/[WAR File Directory]/
       - WAR File Directory: WAR artifact 생성 시 특별한 설정을 하지 않았다면, 기본 디렉터리명은 '[Project Name]\_war' 입니다.
     - Container path: /usr/local/tomcat/webapps/

  4. Run 클릭

# 배포한 Web Application으로 접속

- 접속 URL: http://127.0.0.1:8080/[WAR artifact File Name]/

> 참고: [Deploy a Java web application inside a Tomcat server container](https://www.jetbrains.com/help/idea/deploying-a-web-app-into-an-app-server-container.html)
