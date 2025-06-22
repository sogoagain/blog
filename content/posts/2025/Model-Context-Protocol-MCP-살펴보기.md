---
path: "mcp-overview"
date: "2025-06-22"
title: "Model Context Protocol(MCP) 살펴보기"
subtitle: "에이전트 시대로 가는 길"
tags: ["인공지능", "LLM", "MCP", "에이전트"]
---

# MCP, 왜 필요할까?

## LLM의 한계

- LLM은 텍스트 생성만 할 수 있음
- 즉, LLM은 “행동”을 할 수 없음
    - 예를 들어, LLM은 스스로 인터넷 브라우징을 할 수 없음

### 기존의 해결책

- LLM에게 필요한 도구(행동)를 각각의 애플리케이션 개발자가 구현
    - 예를 들어, ChatGPT에서 GPT가 인터넷 브라우징을 할 수 있게 OpenAI 개발자가 웹 브라우징 기능을 개발하여 제공

### 기존 해결책의 문제점

- “행동”을 위한 기능이 애플리케이션에 종속됨
- 즉, 확장성과 이식성에 문제
    - ChatGPT의 인터넷 브라우징 기능을 다른 LLM 애플리케이션에서는 사용하지 못함

### 프로토콜을 통한 해결

- LLM의 “행동”을 위한 기능의 제공과 사용을 프로토콜로 정의
- 확장성과 이식성 문제 해결

# MCP 아키텍처 및 구성 요소

![mcp-architecture-diagram.png](images/mcp-architecture-diagram.png)

## MCP Host

- LLM을 사용하는 애플리케이션 (Claude, IDE 등)

## MCP Client

- LLM이 요청한 도구를 사용하기 위해 MCP Server와 통신

## MCP Server

- LLM이 사용할 수 있는 도구들을 제공

# MCP가 제공할 수 있는 것들

## Tools

- 데이터 조회, 연산 수행 등 LLM 에게 손과 발이 되어주는 기능들
- 수행 전 사용자의 승인이 필요

## Resources

- PDF 문서, 이미지 등의 파일과 같은 정적 자원을 제공

## Prompts

- 특수한 목적을 위해 미리 작성된 프롬프트를 제공
    - 예를 들어, 코드리뷰를 위한 MCP 서버라면 프로그래밍 언어, 프레임워크 등의 정보를 전달받아 그에 알맞은 프롬프트를 제공

# 데이터 전송 방법

## 1. 표준입출력 (STDIO)

- 로컬에서 작동시키는 MCP Server에서 사용

## 2. SSE

- 원격에서 작동시키는 MCP Server에서 사용
- HTTP GET/POST 요청

## 각 MCP Client는 하나의 MCP Server와 1:1로 연결

![mcp-client-server-connection.png](images/mcp-client-server-connection.png)

- 하나의 MCP Host 내에서 여러 개의 MCP Client가 생성되며, 각 Client는 특정 MCP Server와 1:1로 연결되어 통신

# MCP를 지원하는 LLM 애플리케이션의 작동 흐름

## 시퀀스 다이어그램

![mcp-sequence-diagram.png](images/mcp-sequence-diagram.png)

## 간단한 LLM 에이전트

- 시퀀스 다이어그램의 각 단계를 확인할 수 있는 `LangGraph`로 개발한 간단한 에이전트
- MCP Client로서 MCP Server를 활용하여 사용자 질의에 대한 답변 생성

### 코드

```python
# LLM으로 GPT 사용
llm = ChatOpenAI()

# 날씨 정보를 제공하는 MCP 서버 실행 정보
stdio_server_params = StdioServerParameters(
    command="python",
    args=["/...(생략).../mcp-servers/weather_server.py"],
)


async def main():
    async with stdio_client(stdio_server_params) as (read, write):
        async with ClientSession(read_stream=read, write_stream=write) as session:
            # 1. 연결 초기화
            await session.initialize()
            # 2. 제공 가능한 Tool 조회
            tools = await load_mcp_tools(session)
            agent = create_react_agent(llm, tools)
            # 3. 질의
            result = await agent.ainvoke({"messages": [HumanMessage(content="뉴욕의 현재 날씨는?")]})
            # 12. 응답
            print(result["messages"][-1].content)
```

### LangGraph 실행 트레이스

- 트레이스를 통해 사용자 질의부터 최종 응답까지 에이전트의 처리 과정 확인 가능
  - 첫 번째 `agent` 노드의 `call_model`에서 LLM이 `get_forecast` 도구 사용을 결정하고 필요한 파라미터(위도, 경도)를 생성해 호출 요청
  - `tools` 노드의 `get_forecast`에서 MCP Client를 통해 MCP Server의 날씨 예보 도구 실행
  - 두 번째 `agent` 노드의 `call_model`에서 도구 실행 결과를 바탕으로 LLM이 최종 응답 생성

![langgraph-execution-trace.png](images/langgraph-execution-trace.png)

### GPT `Chat Completion` API 호출 로그

- MCP 도구(`get_forecast`)의 호출을 요청하는 응답 생성
  - 시퀀스 다이어그램 4~6 단계

![gpt-api-call-log-mcp-response.png](images/gpt-api-call-log-mcp-response.png)

- GPT가 MCP 도구(`get_forecast`)의 실행 결과를 참고해 최종 답변 생성
  - 시퀀스 다이어그램 9~11 단계

![gpt-api-call-log-final-response.png](images/gpt-api-call-log-final-response.png)

### 실행 결과

![execution-result.png](images/execution-result.png)
