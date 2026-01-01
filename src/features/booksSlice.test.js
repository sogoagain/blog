import { createStore } from "../testUtils";

import booksReducer, { loadBooks } from "./booksSlice";

import { fetchBooks } from "../services/blog";

import READING_LIST from "../__fixtures__/books";

jest.mock("../services/blog");

describe("reading list reducer", () => {
  const initialBooksState = {
    books: [],
    keyword: {
      keywords: {},
      selected: null,
    },
    loading: false,
    error: null,
  };

  describe("loadBooks.pending", () => {
    it("loading 상태를 true로 변경한다", () => {
      const state = booksReducer(initialBooksState, loadBooks.pending());

      expect(state.loading).toBe(true);
    });
  });

  describe("loadBooks.fulfilled", () => {
    it("독서목록을 추가한다", () => {
      const previousState = {
        ...initialBooksState,
        books: [
          {
            id: "4b70e3c6-c46a-4574-a9d5-60e8dee699f3",
            title: "임백준의 대살개문",
            keywords: [],
          },
        ],
      };

      const state = booksReducer(
        previousState,
        loadBooks.fulfilled([
          {
            id: "39fc33dc-7164-4ffe-bc75-0d075b79c3b4",
            title: "1만 시간의 재발견",
            keywords: ["자기계발"],
          },
        ]),
      );

      expect(state.books).toHaveLength(2);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe("loadBooks.rejected", () => {
    it("에러 메시지를 저장한다", () => {
      const state = booksReducer(
        initialBooksState,
        loadBooks.rejected(new Error("테스트 에러")),
      );

      expect(state.loading).toBe(false);
      expect(state.error).toBe("테스트 에러");
    });
  });
});

describe("reading list actions", () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe("loadBooks", () => {
    beforeEach(() => {
      fetchBooks.mockClear();
    });

    context("독서목록을 성공적으로 불러오면", () => {
      beforeEach(() => {
        fetchBooks.mockResolvedValue(READING_LIST);
      });

      it("독서목록 상세 정보를 설정한다", async () => {
        await store.dispatch(loadBooks());

        const { books } = store.getState();

        expect(books.books).toHaveLength(5);
        expect(books.error).toBeNull();
      });
    });

    context("독서목록을 불러오는데 실패하면", () => {
      beforeEach(() => {
        fetchBooks.mockRejectedValue(
          new Error("독서목록을 불러오지 못했습니다."),
        );
      });

      it("에러 메시지를 저장한다", async () => {
        const { books: previousState } = store.getState();

        await store.dispatch(loadBooks());

        const { books } = store.getState();

        expect(books.books).toBe(previousState.books);
        expect(books.error).toBe("독서목록을 불러오지 못했습니다.");
      });
    });
  });
});
