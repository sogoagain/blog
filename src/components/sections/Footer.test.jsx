import React from "react";

import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("<Footer/>", () => {
  const title = "SOGOAGAIN";
  const rss = "/rss.xml";
  const social = {
    email: "test@gmail.com",
    github: "https://github.com/sogoagain",
    twitter: "https://twitter.com/sogoagain",
    linkedin: "https://www.linkedin.com/in/sogoagain",
  };

  beforeEach(() => {
    render(<Footer title={title} rss={rss} social={social} />);
  });

  it("블로그 제작 정보를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(`${title} ©${year}`);

    expect(copyrightEl).toBeInTheDocument();
  });

  it("RSS 링크를 출력한다", () => {
    const rssEl = screen.getByAltText("RSS");

    expect(rssEl).toBeInTheDocument();
    expect(rssEl.closest("a")).toHaveAttribute("href", "/rss.xml");
  });

  it.each`
    socialName    | link
    ${"Email"}    | ${`mailto:${social.email}`}
    ${"GitHub"}   | ${social.github}
    ${"Twitter"}  | ${social.twitter}
    ${"LinkedIn"} | ${social.linkedin}
  `(
    "'$socialName'(으)로 이동하는 '$link'를 출력한다",
    ({ socialName, link }) => {
      const socialEl = screen.getByAltText(socialName);

      expect(socialEl).toBeInTheDocument();
      expect(socialEl.closest("a")).toHaveAttribute("href", link);
    }
  );
});
