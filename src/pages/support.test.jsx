import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchGithubUser } from "../services/github";

import SupportPage from "./support";

import SITE_QUERY from "../__fixtures__/siteQuery";
import GITHUB_USER from "../__fixtures__/githubUser";

jest.mock("../services/github");

describe("SupportPage", () => {
  let container;

  beforeEach(() => {
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    const result = render(<SupportPage location={{ pathname: "/support" }} />);
    container = result.container;
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("Support · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("SOGOAGAIN");
    const supportImageEl = screen.getByAltText("Support");
    const aboutImageEl = screen.getByAltText("About");

    expect(titleEl).toBeInTheDocument();
    expect(supportImageEl).toBeInTheDocument();
    expect(aboutImageEl).toBeInTheDocument();
  });

  it("후원 문구를 출력한다", () => {
    const titleEl = screen.getByText("Buy me a 막걸리🌾");

    expect(titleEl).toBeInTheDocument();
  });

  it("비트코인 주소를 출력한다", () => {
    const qrEl = screen.getByTestId("bitcoin-qr-element");
    const addressEl = screen.getByText(
      SITE_QUERY.site.siteMetadata.bitcoinAddress
    );

    expect(qrEl).toBeInTheDocument();
    expect(addressEl).toBeInTheDocument();
  });

  it("배경화면에 파티클 효과를 출력한다", () => {
    const particleEl = container.querySelector("#particle-network");

    expect(particleEl).toBeInTheDocument();
  });

  it("footer를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(
      `${SITE_QUERY.site.siteMetadata.title} ©${year}`
    );

    expect(copyrightEl).toBeInTheDocument();
  });
});
