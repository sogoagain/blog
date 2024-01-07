import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import NostrPage from "./nostr";

import SITE_QUERY from "../__fixtures__/siteQuery";
import ABOUT_QUERY from "../__fixtures__/aboutQuery";
import NOSTR from "../__fixtures__/nostr";

describe("<NostrPage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<NostrPage data={ABOUT_QUERY} location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("Nostr · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("홈");
    const bitcoinEl = screen.getByText("비트코인");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(bitcoinEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
