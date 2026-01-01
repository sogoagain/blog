import React from "react";

import { render, screen } from "@testing-library/react";

import ErrorBoundary from "./ErrorBoundary";

function ThrowError() {
  throw new Error("테스트 에러");
}

describe("<ErrorBoundary/>", () => {
  it("정상적인 자식 컴포넌트를 렌더링한다", () => {
    render(
      <ErrorBoundary>
        <p>정상 콘텐츠</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("정상 콘텐츠")).toBeInTheDocument();
  });

  it("에러 발생 시 기본 폴백 메시지를 보여준다", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(
      screen.getByText("오류가 발생했습니다. 페이지를 새로고침 해주세요."),
    ).toBeInTheDocument();
  });

  it("에러 발생 시 커스텀 폴백을 보여준다", () => {
    render(
      <ErrorBoundary fallback={<p>커스텀 에러 메시지</p>}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText("커스텀 에러 메시지")).toBeInTheDocument();
  });
});
