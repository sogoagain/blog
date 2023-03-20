import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import HeaderContainer from "./HeaderContainer";

import SITE_QUERY from "../__fixtures__/siteQuery";

jest.mock("../services/github");

describe("HeaderContainer", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue(SITE_QUERY);
  });

  it("홈 페이지 링크를 출력한다", async () => {
    render(<HeaderContainer />);

    const titleEl = screen.getByText("홈");

    expect(titleEl).toHaveAttribute("href", "/");
  });

  it("비트코인 페이지 링크를 출력한다", () => {
    render(<HeaderContainer />);

    const bitcoinEl = screen.getByText("비트코인");

    expect(bitcoinEl).toHaveAttribute("href", "/bitcoin");
  });

  it("소개 페이지 링크를 출력한다", () => {
    render(<HeaderContainer />);

    const aboutEl = screen.getByText("소개");

    expect(aboutEl).toHaveAttribute("href", "/about");
  });

  it("RSS 링크를 출력한다", () => {
    render(<HeaderContainer />);

    const rssEl = screen.getByText("RSS");

    expect(rssEl).toHaveAttribute("href", "/rss.xml");
  });
});
