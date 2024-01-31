import { combineReducers } from "redux";

import lightningReducer from "./features/lightningSlice";
import nostrReducer from "./features/nostrSlice";
import postsReducer from "./features/postsSlice";
import readingListReducer from "./features/readingListSlice";

export default combineReducers({
  lightning: lightningReducer,
  nostr: nostrReducer,
  posts: postsReducer,
  readingList: readingListReducer,
});
