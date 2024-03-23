import { createStore } from "../testUtils";

import booksReducer, {
  appendBooks,
  setLoading,
  setError,
  loadBooks,
} from "./booksSlice";

import { fetchBooks } from "../services/blog";

import READING_LIST from "../__fixtures__/books";

jest.mock("../services/blog");

describe("reading list reducer", () => {
  const initialBooksState = {
    books: [],
    loading: false,
    error: false,
  };

  describe("appendBooks", () => {
    it("독서목록을 추가한다", () => {
      const previousState = {
        ...initialBooksState,
        books: [
          {
            id: "4b70e3c6-c46a-4574-a9d5-60e8dee699f3",
            title: "임백준의 대살개문",
            image:
              "https://bookthumb-phinf.pstatic.net/cover/105/276/10527622.jpg",
            review: {
              text: "https://blog.sogoagain.com/posts/2019/culture-and-technology/",
              href: "https://blog.sogoagain.com/posts/2019/culture-and-technology/",
            },
            url: "https://sogoagain.notion.site/4b70e3c6c46a4574a9d560e8dee699f3",
          },
          {
            id: "39fc33dc-7164-4ffe-bc75-0d075b79c3b4",
            title: "1만 시간의 재발견",
            image:
              "https://bookthumb-phinf.pstatic.net/cover/107/653/10765371.jpg",
            review: {
              text: "https://blog.sogoagain.com/posts/2019/deliberate-practice/",
              href: "https://blog.sogoagain.com/posts/2019/deliberate-practice/",
            },
            url: "https://sogoagain.notion.site/1-39fc33dc71644ffebc750d075b79c3b4",
          },
        ],
      };

      const state = booksReducer(
        previousState,
        appendBooks([
          {
            id: "39fc33dc-7164-4ffe-bc75-0d075b79c3b4",
            title: "1만 시간의 재발견",
            image:
              "https://bookthumb-phinf.pstatic.net/cover/107/653/10765371.jpg",
            review: {
              text: "https://blog.sogoagain.com/posts/2019/deliberate-practice/",
              href: "https://blog.sogoagain.com/posts/2019/deliberate-practice/",
            },
            url: "https://sogoagain.notion.site/1-39fc33dc71644ffebc750d075b79c3b4",
          },
          {
            id: "bac64649-10d2-41d8-b274-bd9bb15f996b",
            title: "프로그래머의 길, 멘토에게 묻다",
            image:
              "https://bookthumb-phinf.pstatic.net/cover/063/324/06332442.jpg",
            review: {
              text: "https://blog.sogoagain.com/posts/2020/apprenticeship-patterns/",
              href: "https://blog.sogoagain.com/posts/2020/apprenticeship-patterns/",
            },
            url: "https://sogoagain.notion.site/bac6464910d241d8b274bd9bb15f996b",
          },
        ]),
      );

      expect(state.books).toHaveLength(3);
    });
  });

  describe("setLoading", () => {
    it("loading 상태를 변경한다", () => {
      const previousState = initialBooksState;

      const state = booksReducer(previousState, setLoading(true));

      expect(state.loading).toBe(true);
    });
  });

  describe("setError", () => {
    it("error 상태를 변경한다", () => {
      const previousState = initialBooksState;

      const state = booksReducer(previousState, setError(true));

      expect(state.error).toBe(true);
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
        await store.dispatch(loadBooks(5));

        const { books } = store.getState();

        expect(books.books).toHaveLength(5);
        expect(books.error).toBe(false);
      });
    });

    context("독서목록을 불러오는데 실패하면", () => {
      beforeEach(() => {
        fetchBooks.mockRejectedValue(
          new Error("독서목록을 불러오지 못했습니다."),
        );
      });

      it("error 상태를 true로 변경한다", async () => {
        const { books: previousState } = store.getState();

        await store.dispatch(loadBooks(5));

        const { books } = store.getState();

        expect(books.books).toBe(previousState.books);
        expect(books.error).toBe(true);
      });
    });
  });
});
