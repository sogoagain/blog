import { createSlice } from "@reduxjs/toolkit";

import { fetchReadingList } from "../services/blog";

const { actions, reducer } = createSlice({
  name: "readingList",
  initialState: {
    books: [],
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

export const { appendBooks, setLoading, setError } = actions;

export function loadReadingList() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const readingList = await fetchReadingList();
      dispatch(appendBooks(readingList));
      dispatch(setError(false));
    } catch (err) {
      dispatch(setError(true));
    }
    dispatch(setLoading(false));
  };
}

export default reducer;
