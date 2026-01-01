import React, { act } from "react";

import { waitFor } from "@testing-library/react";

import { useStaticQuery } from "gatsby";

import { render, screen, fireEvent } from "../testUtils";

import { fetchBooks } from "../services/blog";

import BooksPage from "./books";

import SITE_QUERY from "../__fixtures__/siteQuery";
import READING_LIST from "../__fixtures__/books";

jest.mock("../services/blog");

describe("<BooksPage/>", () => {
  beforeEach(async () => {
    fetchBooks.mockClear();
    fetchBooks.mockResolvedValue(READING_LIST);
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

  it("키워드 목록을 출력한다", () => {
    ["개발", "교양", "성장의지도", "비즈니스"].forEach((keyword) => {
      const keywordEl = screen.getByText(keyword);

      expect(keywordEl).toBeInTheDocument();
    });
  });

  it("키워드 목록이 책 갯수를 기준으로 내림차순, 책 갯수가 동일하면 한국어 기준 정렬되어 출력된다", () => {
    const labels = screen
      .getAllByText(/(개발|교양|성장의지도|비즈니스)/)
      .map((label) => label.textContent)
      .filter((text) => !text.startsWith("#"));

    const sortedKeywords = ["교양", "개발", "비즈니스", "성장의지도"];

    expect(labels).toEqual(sortedKeywords);
  });

  it("선택한 키워드에 따라 책을 필터링한다", () => {
    const keywordEl = screen.getByText("성장의지도");
    fireEvent.click(keywordEl);

    const items = screen.getAllByRole("listitem");
    const book = screen.getByText("1만 시간의 재발견");

    expect(items).toHaveLength(1);
    expect(book).toBeInTheDocument();
  });

  it("키워드 필터를 해제하면 모든 책을 출력한다", () => {
    const keywordEl = screen.getByText("성장의지도");
    fireEvent.click(keywordEl);
    fireEvent.click(keywordEl);

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(5);
  });

  it("footer를 출력한다", () => {
    const goTopEl = screen.getByText("↑ 처음으로");

    expect(goTopEl).toBeInTheDocument();
  });
});
