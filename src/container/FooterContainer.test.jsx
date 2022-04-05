import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import FooterContainer from "./FooterContainer";

import SITE_QUERY from "../__fixtures__/siteQuery";

describe("FooterContainer", () => {
  const { title, rss, social } = SITE_QUERY.site.siteMetadata;

  beforeEach(() => {
    useStaticQuery.mockReturnValue(SITE_QUERY);

    render(<FooterContainer />);
  });

  it("블로그 제작 정보를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(`${title} ©${year}`);

    expect(copyrightEl).toBeInTheDocument();
  });

  it("RSS 링크를 출력한다", () => {
    const rssEl = screen.getByAltText("RSS");

    expect(rssEl).toBeInTheDocument();
    expect(rssEl.closest("a")).toHaveAttribute("href", rss);
  });

  it.each`
    socialName    | link
    ${"Email"}    | ${`mailto:${social.email}`}
    ${"GitHub"}   | ${`https://github.com/${social.github}`}
    ${"Twitter"}  | ${`https://twitter.com/${social.twitter}`}
    ${"LinkedIn"} | ${`https://www.linkedin.com/in/${social.linkedin}`}
  `(
    "'$socialName'(으)로 이동하는 '$link'를 출력한다",
    ({ socialName, link }) => {
      const socialEl = screen.getByAltText(socialName);

      expect(socialEl).toBeInTheDocument();
      expect(socialEl.closest("a")).toHaveAttribute("href", link);
    }
  );
});
