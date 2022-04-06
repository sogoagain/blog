import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchGithubUser } from "../services/github";

import IndexPage from "./index";

import SITE_QUERY from "../__fixtures__/siteQuery";
import POST_LIST_QUERY from "../__fixtures__/postListQuery";
import GITHUB_USER from "../__fixtures__/githubUser";

jest.mock("../services/github");

describe("IndexPage", () => {
  beforeEach(() => {
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      ...POST_LIST_QUERY,
    });

    render(<IndexPage />);
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("SOGOAGAIN");
    const imageEl = screen.getByAltText("프로필 이미지");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("포스트 목록을 출력한다", () => {
    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(POST_LIST_QUERY.allMarkdownRemark.nodes.length);
  });

  it("포스트 링크를 출력한다", () => {
    const linkEl = screen.getAllByRole("listitem")[0].firstChild;

    expect(linkEl.closest("a")).toHaveAttribute(
      "href",
      "/posts/2021/doubling-ratio/"
    );
  });

  it("footer를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(
      `${SITE_QUERY.site.siteMetadata.title} ©${year}`
    );

    expect(copyrightEl).toBeInTheDocument();
  });
});
