import React from "react";

import { render, screen } from "@testing-library/react";

import PostItem from "./PostItem";

describe("<PostItem/>", () => {
  const post = {
    slug: "/2021/doubling-ratio/",
    date: "2021-01-20",
    title: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
  };

  beforeEach(() => {
    render(
      <PostItem
        title={post.title}
        date={post.date}
        to={`/posts${post.slug}`}
      />,
    );
  });

  it("제목을 출력한다", () => {
    const titleEl = screen.getByText(post.title);

    expect(titleEl).toBeInTheDocument();
  });

  it("작성 일자를 출력한다", () => {
    const dateEl = screen.getByText("2021.01.20");

    expect(dateEl).toBeInTheDocument();
    expect(dateEl).toHaveAttribute("datetime", "2021-01-20T00:00:00.000Z");
  });

  it("링크를 출력한다", () => {
    const linkEl = screen.getByRole("link", {
      name: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
    });

    expect(linkEl).toHaveAttribute("href", "/posts/2021/doubling-ratio/");
  });
});
