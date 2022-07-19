import { combineReducers } from "redux";

import profileReducer from "./features/profileSlice";
import readingListReducer from "./features/readingListSlice";

export default combineReducers({
  profile: profileReducer,
  readingList: readingListReducer,
});
