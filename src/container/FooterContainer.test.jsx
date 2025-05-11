import React from "react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import FooterContainer from "./FooterContainer";

import SITE_QUERY from "../__fixtures__/siteQuery";

describe("<FooterContainer/>", () => {
  const { title } = SITE_QUERY.site.siteMetadata;

  beforeEach(() => {
    useStaticQuery.mockReturnValue(SITE_QUERY);

    render(<FooterContainer />);
  });

  it("블로그 제작 정보를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(`${title} © 2017-${year}`);

    expect(copyrightEl).toBeInTheDocument();
  });

  it.each`
    text        | link
    ${"Email"}  | ${`mailto:hello@sogoagain.com`}
    ${"GitHub"} | ${`https://github.com/sogoagain`}
    ${"Nostr"}  | ${`https://primal.net/sogoagain`}
  `("'$text'(으)로 이동하는 '$link'를 출력한다", ({ text, link }) => {
    const linkEl = screen.getByText(text);

    expect(linkEl).toHaveAttribute("href", link);
  });
});
