import { combineReducers } from "redux";

import lightningReducer from "./features/lightningSlice";
import nostrReducer from "./features/nostrSlice";
import postsReducer from "./features/postsSlice";
import booksReducer from "./features/booksSlice";

export default combineReducers({
  lightning: lightningReducer,
  nostr: nostrReducer,
  posts: postsReducer,
  books: booksReducer,
});
