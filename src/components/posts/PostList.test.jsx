import React from "react";

import { render, screen } from "@testing-library/react";

import PostList from "./PostList";

describe("<PostList/>", () => {
  const posts = [
    {
      slug: "/2021/doubling-ratio/",
      date: "2021-01-20",
      subtitle: "내가 작성한 로직의 복잡도는 얼마나 될까?",
      title: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
    },
    {
      slug: "/2020/2020-retrospective/",
      date: "2020-12-31",
      subtitle: "2020년을 돌아보며 준비하는 2021년",
      title: "2020년 회고",
    },
    {
      slug: "/2020/react-seminar-retrospective/",
      date: "2020-12-11",
      subtitle: "리알못의 리액트 탐방기",
      title: "백엔드 개발자가 회사에서 리액트 세미나를 진행하기까지",
    },
  ];

  beforeEach(() => {
    render(<PostList posts={posts} basePath="/posts" />);
  });

  it("포스트 목록을 출력한다", () => {
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(posts.length);
  });

  it("포스트 링크를 출력한다", () => {
    const linkEl = screen.getByRole("link", {
      name: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
    });

    expect(linkEl).toHaveAttribute("href", "/posts/2021/doubling-ratio/");
  });
});
