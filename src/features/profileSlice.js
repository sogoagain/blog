import { createSlice } from "@reduxjs/toolkit";

import { fetchGithubUser } from "../services/github";

const { actions, reducer } = createSlice({
  name: "profile",
  initialState: {
    image: {
      src: null,
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

export function loadProfileImageSrc(githubUserName) {
  return async (dispatch) => {
    let src;
    try {
      const user = await fetchGithubUser(githubUserName);
      src = user.avatar_url;
    } catch (err) {
      src = null;
    }
    dispatch(setImage({ src }));
  };
}

export default reducer;
