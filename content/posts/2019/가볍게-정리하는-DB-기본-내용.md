---
path: "database-basics"
date: "2019-01-22"
title: "가볍게 정리하는 DB 기본"
subtitle: "MS-SQL 중심으로 정리해본 DB 기본 내용"
tags: ["DB"]
---

# DB

- 여러 사용자에 의해 공유되어 사용될 목적으로 통합 관리되는 구조화된 데이터의 집합체
- 대표적인 데이터베이스
  > - 관계형 데이터베이스
  > - 개체 지향형 데이터베이스
  > - 개체 관계형 데이터베이스

## 데이터베이스 관리 시스템 (DBMS)

- 데이터베이스를 쉽고 빠르게 관리(입력, 조회, 수정 및 삭제 등)할 수 있도록 도와주는 소프트웨어(응용 프로그램)
- 대표적인 RDBMS
  > - SQL Server
  > - Oracle
  > - Sybase
  > - Informix
  > - DB2

## DB 클라이언트 도구

- DBMS는 기본적으로 서버 프로그램이며, DBMS에 접속하여 데이터 관련 작업을 하는 클라이언트 프로그램이 필요
  > - MS의 SQL Server Management Studio

---

# RDB 관계

- 테이블은 다음의 세 가지 방식으로 관계를 맺음
  1. 1:1
  2. 1:N
  3. N:N
     > 1:N(일대다) 관계가 가장 많이 사용됨
     > 1:N 관계는 부모:자식 관계 특성을 가짐

---

# 용어 및 TIP

1. 선택한 영역 주석 처리 / 해제: Ctrl + K, C / Ctrl + K, U
2. \*는 애스터리스크 또는 별표라고 읽는다.
3. 레코드(record): RDB에서 하나의 정보는 하나의 행으로 저장되는 데 이 행을 레코드라고 함.
4. ERD: Entity Relationship Diagram, 테이블(개체) 간의 관계를 나타낸 다이어그램

---

# SQL (Structured Query Language)

> 발음: 시퀄 또는 에스큐엘

- 사용자가 DBMS와 의사소통 할 때 사용하는 프로그래밍 언어

## INSERT 문

```sql
INSERT INTO 테이블(열1, 열2, ..., 열n)
VALUES (값1, 값2, ..., 값n)
```

## SELECT 문

```sql
SELECT 열1, 열2, ..., 열n
FROM 테이블
[WHERE 조건]
[ORDER BY 정렬기준_열 [ASC|DESC]]
```

## UPDATE 문

```sql
UPDATE 테이블
SET 열1 = '값1', 열2 = '값2', ..., 열n = '값n'
[WHERE 조건]
```

## DELETE 문

```sql
DELETE FROM 테이블
[WHERE 조건]
```

## JOIN 문

```sql
SELECT a.열1, a.열2, ..., a.열n, b.열1, b.열2, ..., b.열3
FROM A a INNER JOIN B b
ON a.열x = b.열x
```

```sql
SELECT a.열1, a.열2, ..., a.열n, b.열1, b.열2, ..., b.열3
FROM A a LEFT[RIGHT] OUTER JOIN B b
ON a.열x = b.열x
```

---

# 저장 프로시저 (Stored Procedure)

- 일련의 SQL 구문을 마치 하나의 함수처럼 실행하기 위해 만들어 둔 SQL 구문의 집합
- 장점
  1. 성능 향상: 캐시 메모리에 저장된 결과를 사용 -> 실행 속도 향상
  2. 보안 강화: 저장 프로시저 실행 권한만 부여하는 등 권한 제어 가능
  3. 네트워크 전송량 감소: SQL문 전체를 전송하지 않고 필요한 매개변수만 전달
  4. 모듈식 프로그래밍: 재사용 용이

---

# 트랜잭션 (Transaction)

- DB에서 더 이상 쪼갤 수 없는 하나로 묶여진 프로세스 처리(조회, 입력, 수정, 삭제) 단위
  > - 트랜잭션 시작: BEGIN TRANSACTION
  > - 트랜잭션 적용: COMMIT
  > - 트랜잭션 취소: ROLLBACK
  > - 트랜잭션 예외 처리: TRY...CATCH (SQL Server 2005 이후)

## 저장 프로시저 생성 및 트랜잭션 처리

```sql
CREATE PROCEDURE 프로시저명
    @매개변수 데이터형식
AS  -- 매개변수와 실제 실행될 SQL 구문 구분
BEGIN TRY
    BEGIN TRANSACTION   -- 트랜잭션 시작

    (처리 내용)

    COMMIT  -- 트랜잭션에 존재하는 프로세스의 처리 결과 적용
END TRY

BEGIN CATCH -- TRY 블럭의 오류 캐치
    IF(@@TRANCOUNT > 0)
        ROLLBACK    --  트랜잭션 처리 내용 취소 (이전 상태로 복원)


    -- TRY 블럭에서 발생한 오류 로깅
    DECLARE @ErrorMsg nvarchar(4000)    -- 오류 메시지
            , @ErrorSeverity int        -- 오류의 심각도
    SELECT @ErrorMsg = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY()
    RAISERROR(@ErrorMsg, @ErrorSeverity, 1) -- 오류 정보 등록
END CATCH
```
