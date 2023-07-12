import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppStore } from "./appStore";

// Type for our state
export interface Notifications {
  lastFeed: number,
  feed: any;
}

// Initial state
const initialState: Notifications = {
  lastFeed: 0,
  feed: [],
};

// Actual Slice
export const notificationSlice = createSlice({
  name: "prev",
  initialState,
  reducers: {
    // Action to set the authentication status
    setNotifications(state, action) {
      state.feed = action.payload;
    },
    setLastNotifications(state, action) {
      state.lastFeed = action.payload;
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.prev,
      };
    },
  },
});

export const {
  setNotifications,
  setLastNotifications,
} = notificationSlice.actions;

export const selectNotifications = (state: AppStore) => state.notifications.feed;
export const selectLastNotifications = (state: AppStore) => state.notifications.lastFeed;

export default notificationSlice.reducer;