import { combineReducers } from "redux";

import lightningReducer from "./features/lightningSlice";
import profileReducer from "./features/profileSlice";
import readingListReducer from "./features/readingListSlice";

export default combineReducers({
  lightning: lightningReducer,
  profile: profileReducer,
  readingList: readingListReducer,
});
