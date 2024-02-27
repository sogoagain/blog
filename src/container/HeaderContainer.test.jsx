import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import HeaderContainer from "./HeaderContainer";

import SITE_QUERY from "../__fixtures__/siteQuery";

describe("<HeaderContainer/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue(SITE_QUERY);
  });

  it("포스트 페이지 링크를 출력한다", async () => {
    render(<HeaderContainer pathname="/about" />);

    const postEl = screen.getByText("포스트");

    expect(postEl).toHaveAttribute("href", "/");
  });

  it("소개 페이지 링크를 출력한다", () => {
    render(<HeaderContainer pathname="/" />);

    const aboutEl = screen.getByText("소개");

    expect(aboutEl).toHaveAttribute("href", "/about");
  });

  it("RSS 링크를 출력한다", () => {
    render(<HeaderContainer pathname="/" />);

    const rssEl = screen.getByText("RSS");

    expect(rssEl).toHaveAttribute("href", "/rss.xml");
  });
});
