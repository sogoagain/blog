import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchReadingList } from "../services/blog";
import { fetchGithubUser } from "../services/github";

import AboutPage from "./about";

import SITE_QUERY from "../__fixtures__/siteQuery";
import ABOUT_QUERY from "../__fixtures__/aboutQuery";
import READING_LIST from "../__fixtures__/readingList";
import GITHUB_USER from "../__fixtures__/githubUser";

jest.mock("../services/blog");
jest.mock("../services/github");

describe("AboutPage", () => {
  beforeEach(() => {
    fetchReadingList.mockClear();
    fetchReadingList.mockResolvedValue(READING_LIST);
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<AboutPage data={ABOUT_QUERY} location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("About · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("SOGOAGAIN");
    const supportImageEl = screen.getByAltText("Support");
    const aboutImageEl = screen.getByAltText("About");

    expect(titleEl).toBeInTheDocument();
    expect(supportImageEl).toBeInTheDocument();
    expect(aboutImageEl).toBeInTheDocument();
  });

  it("관심사 Hero를 출력한다", () => {
    const interest = screen.getByText(
      SITE_QUERY.site.siteMetadata.interests[0]
    );

    expect(interest).toBeInTheDocument();
  });

  it("자기소개 내용을 출력한다", () => {
    const aboutEl = screen.getByText("안녕하세요");

    expect(aboutEl).toBeInTheDocument();
  });

  it("독서목록을 출력한다", () => {
    const bookEls = screen.getAllByRole("listitem");

    expect(bookEls).toHaveLength(READING_LIST.books.length);
  });

  it("footer를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(
      `${SITE_QUERY.site.siteMetadata.title} ©${year}`
    );

    expect(copyrightEl).toBeInTheDocument();
  });
});
