import { combineReducers } from "redux";

import nostrReducer from "./features/nostrSlice";
import postsReducer from "./features/postsSlice";
import booksReducer from "./features/booksSlice";

export default combineReducers({
  nostr: nostrReducer,
  posts: postsReducer,
  books: booksReducer,
});
