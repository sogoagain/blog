import React from "react";

import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("<Header/>", () => {
  const menus = [
    { text: "홈", to: "/" },
    { text: "소개", to: "/about" },
    { text: "RSS", to: "/rss.xml" },
  ];

  it("홈 페이지 링크를 출력한다", () => {
    render(<Header menus={menus} />);

    const titleEl = screen.getByText("홈");

    expect(titleEl).toHaveAttribute("href", "/");
  });

  it("소개 페이지 링크를 출력한다", () => {
    render(<Header menus={menus} />);

    const aboutEl = screen.getByText("소개");

    expect(aboutEl).toHaveAttribute("href", "/about");
  });

  it("RSS 링크를 출력한다", () => {
    render(<Header menus={menus} />);

    const rssEl = screen.getByText("RSS");

    expect(rssEl).toHaveAttribute("href", "/rss.xml");
  });
});
