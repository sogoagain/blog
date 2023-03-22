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
    const copyrightEl = screen.getByText(`${title} ©${year}`);

    expect(copyrightEl).toBeInTheDocument();
  });

  it.each`
    text         | link
    ${"Email"}   | ${`mailto:imyong0@gmail.com`}
    ${"GitHub"}  | ${`https://github.com/sogoagain`}
    ${"Twitter"} | ${`https://twitter.com/sogoagain`}
    ${"Nostr"}   | ${`https://snort.social/p/npub1nhffp7hfyy2weckcw7tslaf20qhk7dp59zal2swghx4tpc9ejjxsuqxcf8`}
  `("'$text'(으)로 이동하는 '$link'를 출력한다", ({ text, link }) => {
    const linkEl = screen.getByText(text);

    expect(linkEl).toHaveAttribute("href", link);
  });
});
