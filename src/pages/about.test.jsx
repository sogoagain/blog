import React, { act } from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import AboutPage from "./about";

import SITE_QUERY from "../__fixtures__/siteQuery";
import ABOUT_QUERY from "../__fixtures__/aboutQuery";

jest.mock("../services/blog");

describe("<AboutPage/>", () => {
  beforeEach(async () => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    await act(async () => {
      render(
        <AboutPage data={ABOUT_QUERY} location={{ pathname: "/about" }} />,
      );
    });
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("소개 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const aboutEl = screen.queryByRole("link", { name: "소개" });
    const postEl = screen.getByText("포스트");
    const noteEl = screen.getByText("노트");

    expect(aboutEl).toBe(null);
    expect(postEl).toBeInTheDocument();
    expect(noteEl).toBeInTheDocument();
  });

  it("자기소개 내용을 출력한다", () => {
    const aboutEl = screen.getByText("안녕하세요");

    expect(aboutEl).toBeInTheDocument();
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
