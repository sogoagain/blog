import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchBooks } from "../services/blog";

export const loadBooks = createAsyncThunk("books/loadBooks", async () => {
  const books = await fetchBooks();
  return books;
});

const { actions, reducer } = createSlice({
  name: "books",
  initialState: {
    books: [],
    keyword: {
      keywords: {},
      selected: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    toggleKeyword: (state, { payload: keyword }) => {
      state.keyword.selected =
        state.keyword.selected === keyword ? null : keyword;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadBooks.fulfilled, (state, { payload: books }) => {
        const bookDictionary = [...state.books, ...books].reduce(
          (prev, curr) => ({
            ...prev,
            [curr.id]: { ...curr },
          }),
          {},
        );
        state.books = Object.values(bookDictionary);
        books.forEach((book) => {
          book.keywords.forEach((keyword) => {
            const key = keyword.toUpperCase();
            const existing = state.keyword.keywords[key] || [];
            state.keyword.keywords[key] = [...new Set([...existing, book.id])];
          });
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "알 수 없는 오류가 발생했습니다.";
      });
  },
});

export const { toggleKeyword } = actions;

export default reducer;
