import React from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchReadingList } from "../services/blog";

import BooksPage from "./books";

import SITE_QUERY from "../__fixtures__/siteQuery";
import ABOUT_QUERY from "../__fixtures__/aboutQuery";
import READING_LIST from "../__fixtures__/readingList";

jest.mock("../services/blog");

describe("BooksPage", () => {
  beforeEach(() => {
    fetchReadingList.mockClear();
    fetchReadingList.mockResolvedValue(READING_LIST);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    render(<BooksPage data={ABOUT_QUERY} location={{ pathname: "/" }} />);
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("독서목록 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const titleEl = screen.getByText("홈");
    const bitcoinEl = screen.getByText("비트코인");
    const aboutEl = screen.getByText("소개");

    expect(titleEl).toBeInTheDocument();
    expect(bitcoinEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("독서목록을 출력한다", () => {
    const bookEls = screen.getAllByRole("listitem");

    expect(bookEls).toHaveLength(READING_LIST.books.length);
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
