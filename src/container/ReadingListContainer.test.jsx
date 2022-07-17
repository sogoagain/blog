import React from "react";

import { render, screen, waitFor, fireEvent } from "../testUtils";

import { fetchReadingList } from "../services/blog";

import ReadingListContainer from "./ReadingListContainer";

import READING_LIST from "../__fixtures__/readingList";

jest.mock("../services/blog");

describe("ReadingListContainer", () => {
  beforeEach(() => {
    fetchReadingList.mockClear();
    fetchReadingList.mockResolvedValue(READING_LIST);
  });

  context("독서목록을 불러오면", () => {
    beforeEach(() => {
      render(<ReadingListContainer />);
    });

    it("독서목록을 출력한다", () => {
      const bookEls = screen.getAllByRole("listitem");

      expect(bookEls).toHaveLength(READING_LIST.books.length);
    });

    it("도서 이미지를 출력한다", () => {
      const coverEl = screen.getByAltText("임백준의 대살개문");

      expect(coverEl).toBeInTheDocument();
    });

    it("도서 제목을 출력한다", () => {
      const titleEl = screen.getByText("임백준의 대살개문");

      expect(titleEl).toBeInTheDocument();
    });

    context("도서 감상문 링크가 존재하면", () => {
      it("감상문 링크를 출력한다", () => {
        const linkEls = screen.getAllByRole("link");

        expect(linkEls).toHaveLength(3);
      });
    });

    context("도서 감상문 텍스트가 존재하면", () => {
      it("감상문만 출력한다", () => {
        const reviewEl = screen.getByText(
          "개발 천재들이 어떻게 사고하는지 간접적으로나마 알 수 있었다. 그들을 따라가고자 노력하는 중"
        );

        expect(reviewEl).toBeInTheDocument();
        expect(reviewEl.closest("a")).not.toBeInTheDocument();
      });
    });
  });

  context("독서목록 불러오는 중 에러가 발생하면", () => {
    beforeEach(() => {
      fetchReadingList.mockRejectedValue(
        new Error("독서목록을 불러오지 못했습니다.")
      );
      render(<ReadingListContainer />);
    });

    it("오류 문구를 출력한다", () => {
      const errorEl = screen.getByText("잠시 후 다시 시도해주세요.");

      expect(errorEl).toBeInTheDocument();
    });
  });

  it("'더 불러오기' 버튼을 출력한다", async () => {
    render(<ReadingListContainer />);

    const moreButtonEl = await waitFor(() => screen.getByText("더 불러오기"));

    fireEvent.click(moreButtonEl);

    expect(fetchReadingList).toBeCalledTimes(2);
  });
});
