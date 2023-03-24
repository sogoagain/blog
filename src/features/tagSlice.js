import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "tag",
  initialState: {
    selected: null,
  },
  reducers: {
    toggleTag: (state, { payload: tag }) => ({
      ...state,
      selected: state.selected === tag ? null : tag,
    }),
  },
});

export const { toggleTag } = actions;

export default reducer;
