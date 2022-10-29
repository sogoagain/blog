import React from "react";

import { waitFor } from "@testing-library/react";

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

    render(
      <PostPage
        data={POST_QUERY}
        location={{ pathname: "/posts/2017/leblancs-law/" }}
      />
    );
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() =>
      expect(document.title).toBe("르블랑의 법칙 · SOGOAGAIN")
    );
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("SOGOAGAIN");
    const imageEl = screen.getByAltText("프로필 이미지");

    expect(titleEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
  });

  it("포스트 제목을 출력한다", () => {
    const postTitleEl = screen.getByText("르블랑의 법칙");

    expect(postTitleEl).toBeInTheDocument();
  });

  it("포스트 부제목을 출력한다", () => {
    const subtitleEl = screen.getByText("나중은 결코 오지 않는다.");

    expect(subtitleEl).toBeInTheDocument();
  });

  it("포스트 작성 시간을 출력한다", () => {
    const dateEl = screen.getByText("2017-01-06");

    expect(dateEl).toBeInTheDocument();
  });

  it("포스트 내용을 출력한다", () => {
    const postBodyEl = screen.getByTestId("post-content-element");

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
