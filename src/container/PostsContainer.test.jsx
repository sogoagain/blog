import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import PostsContainer from "./PostsContainer";

import SITE_QUERY from "../__fixtures__/siteQuery";
import POST_LIST_QUERY from "../__fixtures__/postListQuery";

describe("<PostsContainer/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      ...POST_LIST_QUERY,
    });

    render(<PostsContainer />);
  });

  it("포스트 목록을 출력한다", () => {
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(POST_LIST_QUERY.allMarkdownRemark.nodes.length);
  });

  it("포스트 링크를 출력한다", () => {
    const linkEl = screen.getByRole("link", {
      name: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
    });

    expect(linkEl).toHaveAttribute("href", "/posts/2021/doubling-ratio/");
  });
});
