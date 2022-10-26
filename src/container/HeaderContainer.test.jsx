import React from "react";

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

    render(<HeaderContainer />);
  });

  it("헤더를 출력한다", async () => {
    const titleEl = screen.getByText("SOGOAGAIN");
    const imageEl = await screen.getByAltText("프로필 이미지");

    expect(titleEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
  });

  context("github 프로필 이미지를 불러오지 못하면", () => {
    beforeEach(() => {
      fetchGithubUser.mockRejectedValue(
        new Error("Github User 데이터를 가져오지 못했습니다.")
      );
    });

    it("프로필 이미지 element가 존재하지 않는다", async () => {
      const imageEl = await screen.queryByAltText("프로필 이미지");

      expect(imageEl).not.toHaveAttribute("src", "test-file-stub");
    });
  });
});
