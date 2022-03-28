import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchGithubUser } from "../services/github";

import HeaderContainer from "./HeaderContainer";

import GITHUB_USER from "../__fixtures__/githubUser";

jest.mock("../services/github");

describe("HeaderContainer", () => {
  beforeEach(() => {
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          title: "sogoagain 블로그",
          social: {
            github: "sogoagain",
          },
        },
      },
    });
  });

  it("헤더를 출력한다", async () => {
    render(<HeaderContainer />);

    const titleEl = screen.getByText("sogoagain 블로그");
    const imageEl = await screen.getByAltText(
      "sogoagain의 Github 프로필 이미지"
    );
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });
});
