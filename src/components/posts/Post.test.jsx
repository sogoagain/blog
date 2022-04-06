import React from "react";

import { render, screen } from "@testing-library/react";

import Post from "./Post";

describe("<Post/>", () => {
  const post = {
    subtitle: "내가 작성한 로직의 복잡도는 얼마나 될까?",
    title: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
    date: "2021-01-20",
    html: "<div>중요한 로직을 작성할 때면 머릿속에서 떠오르는 질문이다.</div>",
  };

  beforeEach(() => {
    render(
      <Post
        title={post.title}
        subtitle={post.subtitle}
        date={post.date}
        html={post.html}
      />
    );
  });

  it("제목을 출력한다", () => {
    const titleEl = screen.getByText(post.title);

    expect(titleEl).toBeInTheDocument();
  });

  it("부제목을 출력한다", () => {
    const subtitleEl = screen.getByText(post.subtitle);

    expect(subtitleEl).toBeInTheDocument();
  });

  it("작성 일자를 출력한다", () => {
    const dateEl = screen.getByText(post.date);

    expect(dateEl).toBeInTheDocument();
    expect(dateEl).toHaveAttribute("datetime", "2021-01-20T00:00:00.000Z");
  });

  it("본문을 출력한다", () => {
    const bodyEl = screen.getByText(
      "중요한 로직을 작성할 때면 머릿속에서 떠오르는 질문이다."
    );

    expect(bodyEl).toBeInTheDocument();
  });
});
