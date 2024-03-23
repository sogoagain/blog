import { createSlice } from "@reduxjs/toolkit";

import { fetchBooks } from "../services/blog";

const { actions, reducer } = createSlice({
  name: "books",
  initialState: {
    books: [],
    keyword: {
      keywords: {},
      selected: null,
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
        {},
      );
      return {
        ...state,
        books: Object.values(bookDictionary),
      };
    },
    appendKeyword: (state, { payload: { keyword, id } }) => {
      const key = keyword.toUpperCase();
      const newIds = state.keyword.keywords[key]
        ? [...new Set([...state.keyword.keywords[key], id])]
        : [id];
      return {
        ...state,
        keyword: {
          ...state.keyword,
          keywords: {
            ...state.keyword.keywords,
            [key]: newIds,
          },
        },
      };
    },
    toggleKeyword: (state, { payload: keyword }) => ({
      ...state,
      keyword: {
        ...state.keyword,
        selected: state.keyword.selected === keyword ? null : keyword,
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

export const {
  appendBooks,
  appendKeyword,
  toggleKeyword,
  setLoading,
  setError,
} = actions;

export function loadBooks() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const books = await fetchBooks();
      dispatch(appendBooks(books));
      books.forEach((book) => {
        book.keywords.forEach((keyword) => {
          dispatch(appendKeyword({ keyword, id: book.id }));
        });
      });
      dispatch(setError(false));
    } catch (err) {
      dispatch(setError(true));
    }
    dispatch(setLoading(false));
  };
}

export default reducer;
