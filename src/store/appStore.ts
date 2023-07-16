import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export type AppStore = {
  auth: ReturnType<typeof authSlice>;
}

export const combinedStore = combineReducers({
  auth: authSlice,
  // OTHER REDUCERS WILL BE ADDED HERE
});