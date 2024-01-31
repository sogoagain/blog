import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "posts",
  initialState: {
    selectedTag: null,
  },
  reducers: {
    toggleTag: (state, { payload: tag }) => ({
      ...state,
      selectedTag: state.selectedTag === tag ? null : tag,
    }),
  },
});

export const { toggleTag } = actions;

export default reducer;
