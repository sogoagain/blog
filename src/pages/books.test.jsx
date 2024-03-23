import React from "react";

import { act } from "react-dom/test-utils";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen } from "../testUtils";

import { fetchReadingList } from "../services/blog";

import BooksPage from "./books";

import SITE_QUERY from "../__fixtures__/siteQuery";
import READING_LIST from "../__fixtures__/readingList";

jest.mock("../services/blog");

describe("<BooksPage/>", () => {
  beforeEach(async () => {
    fetchReadingList.mockClear();
    fetchReadingList.mockResolvedValue(READING_LIST);
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    await act(async () => {
      render(<BooksPage location={{ pathname: "/books/" }} />);
    });
  });

  it("SEO를 적용한다", async () => {
    await waitFor(() => expect(document.title).toBe("독서 · SOGOAGAIN"));
  });

  it("header를 출력한다", () => {
    const bookEl = screen.queryByRole("link", { name: "독서" });
    const postEl = screen.getByText("포스트");
    const aboutEl = screen.getByText("소개");

    expect(bookEl).toBe(null);
    expect(postEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
  });

  it("독서목록을 출력한다", () => {
    const bookEls = screen.getAllByRole("listitem");

    expect(bookEls).toHaveLength(READING_LIST.length);
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
