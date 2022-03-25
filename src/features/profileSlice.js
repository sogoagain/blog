import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "profile",
  initialState: {
    image: {
      src: "",
    },
  },
  reducers: {
    setImage: (state, { payload: { src } }) => ({
      ...state,
      image: {
        ...state.image,
        src,
      },
    }),
  },
});

export const { setImage } = actions;

export default reducer;
