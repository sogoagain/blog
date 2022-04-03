import React from "react";

import { render, screen } from "@testing-library/react";

import PostItem from "./PostItem";

describe("<PostItem/>", () => {
  const post = {
    slug: "/2021/doubling-ratio/",
    date: "2021-01-20",
    subtitle: "내가 작성한 로직의 복잡도는 얼마나 될까?",
    title: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
  };

  beforeEach(() => {
    render(
      <PostItem title={post.title} subtitle={post.subtitle} date={post.date} />
    );
  });

  it("포스트 제목을 출력한다", () => {
    const titleEl = screen.getByText(post.title);

    expect(titleEl).toBeInTheDocument();
  });

  it("포스트 부제목을 출력한다", () => {
    const subtitleEl = screen.getByText(post.subtitle);

    expect(subtitleEl).toBeInTheDocument();
  });

  it("작성 일자를 출력한다", () => {
    const dateEl = screen.getByText(post.date);

    expect(dateEl).toBeInTheDocument();
    expect(dateEl).toHaveAttribute("datetime", "2021-01-20T00:00:00.000Z");
  });
});
