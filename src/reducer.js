import { combineReducers } from "redux";

import profileReducer from "./features/profileSlice";

export default combineReducers({
  profile: profileReducer,
});
