import React from "react";

import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("<Footer/>", () => {
  const title = "SOGOAGAIN";
  const links = [
    {
      text: "Email",
      href: `mailto:test@gmail.com`,
    },
    {
      text: "GitHub",
      href: `https://github.com/sogoagain`,
    },
    {
      text: "Nostr",
      href: `https://snort.social/p/1234`,
    },
  ];

  beforeEach(() => {
    render(<Footer title={title} links={links} />);
  });

  it("블로그 제작 정보를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(`${title} ©${year}`);

    expect(copyrightEl).toBeInTheDocument();
  });

  it.each`
    text        | link
    ${"Email"}  | ${`mailto:test@gmail.com`}
    ${"GitHub"} | ${`https://github.com/sogoagain`}
    ${"Nostr"}  | ${`https://snort.social/p/1234`}
  `("'$text'(으)로 이동하는 '$link'를 출력한다", ({ text, link }) => {
    const linkEl = screen.getByText(text);

    expect(linkEl).toHaveAttribute("href", link);
  });
});
