import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchGithubUser } from "../services/github";

import {
  createLightningInvoice,
  lookupLightningInvoice,
} from "../services/blog";

import SupportPage from "./support";

import SITE_QUERY from "../__fixtures__/siteQuery";
import GITHUB_USER from "../__fixtures__/githubUser";
import LIGHTNING_INVOICE from "../__fixtures__/lightningInvoice";
import LOOKUP_LIGHTNING_INVOICE from "../__fixtures__/lookupLightningInvoice";

jest.mock("../services/github");
jest.mock("../services/blog");

describe("SupportPage", () => {
  let container;

  beforeEach(() => {
    fetchGithubUser.mockClear();
    fetchGithubUser.mockResolvedValue(GITHUB_USER);
    createLightningInvoice.mockClear();
    createLightningInvoice.mockResolvedValue(LIGHTNING_INVOICE);
    lookupLightningInvoice.mockClear();
    lookupLightningInvoice.mockResolvedValue(LOOKUP_LIGHTNING_INVOICE);
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

  it("페이지 제목을 출력한다", () => {
    const titleEl = screen.getByText("ZAP ⚡");

    expect(titleEl).toBeInTheDocument();
  });

  it("라이트닝 인보이스를 발급하는 form을 출력한다", () => {
    const inputEl = screen.getByPlaceholderText("1000");

    expect(inputEl).toBeInTheDocument();
  });

  it("배경화면에 파티클 효과를 출력한다", () => {
    const particleEl = container.querySelector("#particle-network");

    expect(particleEl).toBeInTheDocument();
  });

  it("사토시 나카모토에게 경의를 표하는 문구를 출력한다", () => {
    const respectsEl = screen.getByText("Pay my respects to");
    const satoshiEl = screen.getByText("Satoshi Nakamoto");

    expect(respectsEl).toBeInTheDocument();
    expect(satoshiEl.closest("a")).toHaveAttribute(
      "href",
      "https://bitcoin.org/bitcoin.pdf"
    );
  });

  it("footer를 출력한다", () => {
    const year = new Date().getFullYear();
    const copyrightEl = screen.getByText(
      `${SITE_QUERY.site.siteMetadata.title} ©${year}`
    );

    expect(copyrightEl).toBeInTheDocument();
  });
});
