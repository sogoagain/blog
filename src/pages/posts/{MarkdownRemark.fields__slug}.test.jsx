import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../../testUtils";

import { fetchGithubUser } from "../../services/github";

import PostPage from "./{MarkdownRemark.fields__slug}";

import GITHUB_USER from "../../__fixtures__/githubUser";
import POST_QUERY from "../../__fixtures__/postQuery";
import SITE_QUERY from "../../__fixtures__/siteQuery";

jest.mock("../../services/github");

describe("PostPage", () => {
  beforeEach(() => {
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<PostPage data={POST_QUERY} />);
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("SOGOAGAIN");
    const imageEl = screen.getByAltText("프로필 이미지");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("포스트 내용을 출력한다", () => {
    const postBodyEl = screen.getByTestId("post-body-element");

    expect(postBodyEl).toHaveTextContent(
      "나는 현재 충분히 아름다운 코드를 짜고 있는가?"
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
