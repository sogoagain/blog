import React from "react";

import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("<Footer/>", () => {
  const title = "SOGOAGAIN";
  const rss = {
    text: "RSS",
    to: "/rss.xml",
  };

  beforeEach(() => {
    render(<Footer title={title} rss={rss} />);
  });

  it("블로그 제작 정보를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(`${title} ©${year}`);

    expect(copyrightEl).toBeInTheDocument();
  });

  it("RSS 링크를 출력한다", () => {
    const rssEl = screen.getByText("RSS");

    expect(rssEl).toBeInTheDocument();
    expect(rssEl.closest("a")).toHaveAttribute("href", "/rss.xml");
  });
});
