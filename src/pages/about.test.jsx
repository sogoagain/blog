import React from "react";

import { act } from "react-dom/test-utils";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import {
  createLightningInvoice,
  lookupLightningInvoice,
} from "../services/blog";

import AboutPage from "./about";

import SITE_QUERY from "../__fixtures__/siteQuery";
import ABOUT_QUERY from "../__fixtures__/aboutQuery";
import LIGHTNING_INVOICE from "../__fixtures__/lightningInvoice";
import LOOKUP_LIGHTNING_INVOICE from "../__fixtures__/lookupLightningInvoice";

jest.mock("../services/blog");

describe("<AboutPage/>", () => {
  beforeEach(async () => {
    createLightningInvoice.mockClear();
    createLightningInvoice.mockResolvedValue(LIGHTNING_INVOICE);
    lookupLightningInvoice.mockClear();
    lookupLightningInvoice.mockResolvedValue(LOOKUP_LIGHTNING_INVOICE);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    await act(async () => {
      render(<AboutPage data={ABOUT_QUERY} location={{ pathname: "/" }} />);
    });
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("소개 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("홈");
    const noteEl = screen.getByText("노트");

    expect(titleEl).toBeInTheDocument();
    expect(noteEl).toBeInTheDocument();
  });

  it("자기소개 내용을 출력한다", () => {
    const aboutEl = screen.getByText("안녕하세요");

    expect(aboutEl).toBeInTheDocument();
  });

  it("라이트닝 인보이스를 발급하는 form을 출력한다", () => {
    const inputEl = screen.getByPlaceholderText("1000");

    expect(inputEl).toBeInTheDocument();
  });

  it("배경화면에 파티클 효과를 출력한다", () => {
    const particleEl = screen.getByText("Particles");

    expect(particleEl).toBeInTheDocument();
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
