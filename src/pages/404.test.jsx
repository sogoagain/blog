import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchGithubUser } from "../services/github";

import NotFoundPage from "./404";

import SITE_QUERY from "../__fixtures__/siteQuery";
import POST_LIST_QUERY from "../__fixtures__/postListQuery";
import GITHUB_USER from "../__fixtures__/githubUser";

jest.mock("../services/github");

describe("NotFoundPage", () => {
  beforeEach(() => {
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
      ...POST_LIST_QUERY,
    });

    render(<NotFoundPage />);
  });

  it("페이지 제목을 표기한다", () => {
    const titleEl = screen.getByText("Not found");

    expect(titleEl).toBeInTheDocument();
  });

  it("홈으로 돌아가기 버튼을 제공한다", () => {
    const linkEl = screen.getByText("Go home");

    expect(linkEl).toHaveAttribute("href", "/");
  });
});
