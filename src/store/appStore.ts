import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import prevSlice from "./prevSlice";
import notificationSlice from "./notificationSlice";

export type AppStore = {
  auth: ReturnType<typeof authSlice>;
  prev: ReturnType<typeof prevSlice>;
  notifications: ReturnType<typeof notificationSlice>;
}

export const combinedStore = combineReducers({
  auth: authSlice,
  prev: prevSlice,
  notifications: notificationSlice,
  // OTHER REDUCERS WILL BE ADDED HERE
});