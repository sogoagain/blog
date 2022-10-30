import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchGithubUser } from "../services/github";

import HeaderContainer from "./HeaderContainer";

import SITE_QUERY from "../__fixtures__/siteQuery";
import GITHUB_USER from "../__fixtures__/githubUser";

jest.mock("../services/github");

describe("HeaderContainer", () => {
  beforeEach(() => {
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    useStaticQuery.mockReturnValue(SITE_QUERY);
  });

  it("타이틀을 출력한다", async () => {
    render(<HeaderContainer />);

    const titleEl = screen.getByText("SOGOAGAIN");

    expect(titleEl).toBeInTheDocument();
  });

  it("후원 페이지 링크를 출력한다", () => {
    render(<HeaderContainer />);

    const supportImageEl = screen.getByAltText("Support");

    expect(supportImageEl.closest("a")).toHaveAttribute("href", "/support");
  });

  it("소개 페이지 링크를 출력한다", () => {
    render(<HeaderContainer />);

    const aboutImageEl = screen.getByAltText("About");

    expect(aboutImageEl.closest("a")).toHaveAttribute("href", "/about");
  });

  context("github 프로필 이미지를 불러오면", () => {
    it("불러온 프로필 이미지를 출력한다", async () => {
      render(<HeaderContainer />);

      await waitFor(() => {
        const profileImageEl = screen.getByAltText("About");
        expect(profileImageEl.src).toEqual(
          "https://github.com/images/error/octocat_happy.gif"
        );
      });
    });
  });

  context("github 프로필 이미지를 불러오지 못하면", () => {
    beforeEach(() => {
      fetchGithubUser.mockClear();
      fetchGithubUser.mockRejectedValue(
        new Error("Github User 데이터를 가져오지 못했습니다.")
      );
    });

    it("기본 프로필 이미지를 출력한다", async () => {
      render(<HeaderContainer />);

      await waitFor(() => {
        const profileImageEl = screen.getByAltText("About");
        expect(profileImageEl.src).toEqual("http://localhost/test-file-stub");
      });
    });
  });
});
