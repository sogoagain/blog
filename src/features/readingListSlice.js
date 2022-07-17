import { createSlice } from "@reduxjs/toolkit";

import { fetchReadingList } from "../services/blog";

const { actions, reducer } = createSlice({
  name: "readingList",
  initialState: {
    books: [],
    page: {
      pageSize: 10,
      hasMore: true,
      nextCursor: null,
    },
    loading: false,
    error: false,
  },
  reducers: {
    appendBooks: (state, { payload: books }) => {
      const bookDictionary = [...state.books, ...books].reduce(
        (prev, curr) => ({
          ...prev,
          [curr.id]: { ...curr },
        }),
        {}
      );
      return {
        ...state,
        books: Object.values(bookDictionary),
      };
    },
    setPage: (state, { payload: { pageSize, hasMore, nextCursor } }) => ({
      ...state,
      page: {
        ...state.page,
        pageSize,
        hasMore,
        nextCursor,
      },
    }),
    setLoading: (state, { payload: loading }) => ({
      ...state,
      loading,
    }),
    setError: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
});

export const { appendBooks, setPage, setLoading, setError } = actions;

export function loadReadingList(pageSize) {
  return async (dispatch, getState) => {
    const {
      readingList: { page },
    } = getState();

    if (!page.hasMore) {
      return;
    }

    dispatch(setLoading(true));
    try {
      const readingList = await fetchReadingList({
        pageSize: pageSize || page.pageSize,
        startCursor: page.nextCursor,
      });
      dispatch(appendBooks(readingList.books));
      dispatch(setPage(readingList.page));
      dispatch(setError(false));
    } catch (err) {
      dispatch(setError(true));
    }
    dispatch(setLoading(false));
  };
}

export default reducer;
