import readingListReducer, {
  appendBooks,
  setPage,
  setLoading,
} from "./readingListSlice";

import READING_LIST from "../__fixtures__/readingList";

describe("reading list reducer", () => {
  const initialReadingListState = {
    books: [],
    page: {
      pageSize: 10,
      hasMore: false,
      nextCursor: null,
    },
    loading: true,
  };

  describe("appendBooks", () => {
    it("독서목록을 추가한다", () => {
      const previousState = {
        ...initialReadingListState,
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

      const state = readingListReducer(
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
        ])
      );

      expect(state.books.length).toBe(3);
    });
  });

  describe("setPage", () => {
    it("page 상태를 변경한다", () => {
      const previousState = initialReadingListState;

      const state = readingListReducer(
        previousState,
        setPage(READING_LIST.page)
      );

      expect(state.page).toEqual(READING_LIST.page);
    });
  });

  describe("setLoading", () => {
    it("loading 상태를 변경한다", () => {
      const previousState = initialReadingListState;

      const state = readingListReducer(previousState, setLoading(true));

      expect(state.loading).toEqual(true);
    });
  });
});
