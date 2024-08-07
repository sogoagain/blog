import React from "react";

import { Provider } from "react-redux";

import { useStaticQuery } from "gatsby";

import { act } from "react-dom/test-utils";

import { render as rtlRender } from "@testing-library/react";

import { render, createStore, screen } from "../testUtils";

import { fetchBooks } from "../services/blog";

import BooksContainer from "./BooksContainer";

import { loadBooks } from "../features/booksSlice";

import SITE_QUERY from "../__fixtures__/siteQuery";
import READING_LIST from "../__fixtures__/books";

jest.mock("../services/blog");

describe("<BooksContainer/>", () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      ...SITE_QUERY,
    });

    fetchBooks.mockClear();
    fetchBooks.mockResolvedValue(READING_LIST);
  });

  context("독서목록을 불러오면", () => {
    beforeEach(async () => {
      await act(async () => {
        render(<BooksContainer />);
      });
    });

    it("독서목록을 출력한다", () => {
      const bookEls = screen.getAllByRole("listitem");

      expect(bookEls).toHaveLength(READING_LIST.length);
    });

    it("도서 이미지를 출력한다", () => {
      const coverEl = screen.getByAltText(
        "임백준의 대살개문(저자: 임백준) 책 표지",
      );

      expect(coverEl).toBeInTheDocument();
    });

    it("도서 제목을 출력한다", () => {
      const titleEl = screen.getByText("임백준의 대살개문");

      expect(titleEl).toBeInTheDocument();
    });

    it("저자를 출력한다", () => {
      const authorEl = screen.getByText("안데르스 에릭슨, 로버트 풀");

      expect(authorEl).toBeInTheDocument();
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
          "천재들이 어떻게 사고하는지 간접적으로나마 알 수 있었다. 그들을 따라가고자 노력하는 중",
        );

        expect(reviewEl).toBeInTheDocument();
        expect(reviewEl.closest("a")).not.toBeInTheDocument();
      });
    });
  });

  context("독서목록 불러오는 중 에러가 발생하면", () => {
    beforeEach(async () => {
      fetchBooks.mockRejectedValue(
        new Error("독서목록을 불러오지 못했습니다."),
      );
      await act(async () => {
        render(<BooksContainer />);
      });
    });

    it("오류 문구를 출력한다", () => {
      const errorEl = screen.getByText(
        "처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );

      expect(errorEl).toBeInTheDocument();
    });
  });

  context("독서목록을 불러왔었다면", () => {
    it("렌더링 시 추가로 불러오지 않는다", async () => {
      const store = createStore();
      store.dispatch(loadBooks());

      await act(async () => {
        rtlRender(
          <Provider store={store}>
            <BooksContainer />
          </Provider>,
        );
      });

      expect(fetchBooks).toHaveBeenCalledTimes(1);
    });
  });
});
