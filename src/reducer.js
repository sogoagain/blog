import { combineReducers } from "redux";

import lightningReducer from "./features/lightningSlice";
import readingListReducer from "./features/readingListSlice";
import tagReducer from "./features/tagSlice";

export default combineReducers({
  lightning: lightningReducer,
  readingList: readingListReducer,
  tag: tagReducer,
});
