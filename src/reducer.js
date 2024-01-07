import { combineReducers } from "redux";

import lightningReducer from "./features/lightningSlice";
import nostrReducer from "./features/nostrSlice";
import readingListReducer from "./features/readingListSlice";
import tagReducer from "./features/tagSlice";

export default combineReducers({
  lightning: lightningReducer,
  nostr: nostrReducer,
  readingList: readingListReducer,
  tag: tagReducer,
});
