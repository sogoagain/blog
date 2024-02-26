import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen, fireEvent } from "../testUtils";

import IndexPage from "./index";

import SITE_QUERY from "../__fixtures__/siteQuery";
import POST_LIST_QUERY from "../__fixtures__/postListQuery";
import TAGS_QUERY from "../__fixtures__/tagsQuery";

describe("<IndexPage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      allMarkdownRemark: {
        ...POST_LIST_QUERY.allMarkdownRemark,
        ...TAGS_QUERY.allMarkdownRemark,
      },
    });

    render(<IndexPage location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("SOGOAGAIN 블로그"));
  });

  it("header를 출력한다", () => {
    const postEl = screen.getByText("포스트");
    const noteEl = screen.getByText("노트");
    const aboutEl = screen.getByText("소개");

    expect(postEl).toBeInTheDocument();
    expect(noteEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("관심사를 출력한다", () => {
    const interest = screen.getByText(
      SITE_QUERY.site.siteMetadata.interests[0],
    );

    expect(interest).toBeInTheDocument();
  });

  it("태그 목록을 출력한다", () => {
    ["C++", "DB", "DOCKER", "GIT"].forEach((tag) => {
      const tagEl = screen.getByText(tag);

      expect(tagEl).toBeInTheDocument();
    });
  });

  it("포스트 목록을 출력한다", () => {
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(POST_LIST_QUERY.allMarkdownRemark.nodes.length);
  });

  it("선택한 태그에 따라 포스트를 필터링한다", () => {
    const tag = screen.getByText("C++");
    fireEvent.click(tag);

    const items = screen.getAllByRole("listitem");

    const filteredPosts = POST_LIST_QUERY.allMarkdownRemark.nodes.filter(
      (post) => post.frontmatter.tags.includes("C++"),
    );

    expect(items).toHaveLength(filteredPosts.length);
  });

  it("포스트 링크를 출력한다", () => {
    const linkEl = screen.getByRole("link", {
      name: "더블링 테스트, 알고리즘 복잡도를 실험으로 예측하는 방법",
    });

    expect(linkEl).toHaveAttribute("href", "/posts/2021/doubling-ratio/");
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
