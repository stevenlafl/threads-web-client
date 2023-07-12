import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import prevSlice from "./prevSlice";

export type AppStore = {
  auth: ReturnType<typeof authSlice>;
  prev: ReturnType<typeof prevSlice>;
}

export const combinedStore = combineReducers({
  auth: authSlice,
  prev: prevSlice,
  // OTHER REDUCERS WILL BE ADDED HERE
});