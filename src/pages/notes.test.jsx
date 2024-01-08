import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import NotePage from "./notes";

import SITE_QUERY from "../__fixtures__/siteQuery";

describe("<NotePage/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<NotePage data={SITE_QUERY} location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("노트 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("홈");
    const bitcoinEl = screen.getByText("비트코인");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(bitcoinEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("노트 목록을 출력한다", () => {
    const note1 = screen.getByText("노트 1");
    const note1Date = screen.getByText("2023-12-24");

    const note2 = screen.getByText("노트 2");
    const note2Date = screen.getByText("2024-01-05");

    const note3 = screen.getByText("노트 3");
    const note3Date = screen.getByText("2024-01-06");

    expect(note1).toBeInTheDocument();
    expect(note1Date).toBeInTheDocument();

    expect(note2).toBeInTheDocument();
    expect(note2Date).toBeInTheDocument();

    expect(note3).toBeInTheDocument();
    expect(note3Date).toBeInTheDocument();
  });

  it("노트만 출력한다", () => {
    const noteEls = screen.getAllByRole("listitem");

    expect(noteEls).toHaveLength(3);
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
