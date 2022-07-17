import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "readingList",
  initialState: {
    books: [],
    page: {
      pageSize: 10,
      hasMore: false,
      nextCursor: null,
    },
    loading: true,
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
  },
});

export const { appendBooks, setPage, setLoading } = actions;

export default reducer;
