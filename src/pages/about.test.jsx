import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchGithubUser } from "../services/github";

import AboutPage from "./about";

import SITE_QUERY from "../__fixtures__/siteQuery";
import ABOUT_QUERY from "../__fixtures__/aboutQuery";
import GITHUB_USER from "../__fixtures__/githubUser";

jest.mock("../services/github");

describe("AboutPage", () => {
  beforeEach(() => {
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<AboutPage data={ABOUT_QUERY} location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("About"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("SOGOAGAIN");
    const imageEl = screen.getByAltText("프로필 이미지");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("자기소개 내용을 출력한다", () => {
    const aboutEl = screen.getByText("안녕하세요");

    expect(aboutEl).toBeInTheDocument();
  });

  it("footer를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(
      `${SITE_QUERY.site.siteMetadata.title} ©${year}`
    );

    expect(copyrightEl).toBeInTheDocument();
  });
});
