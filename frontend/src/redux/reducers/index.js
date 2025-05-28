// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";

import { HospitalReducer } from "./hospitalReducers";

export const reducers = combineReducers({
  hospitalinfo: HospitalReducer,
});
