import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppStore } from "./appStore";

// Type for our state
export interface PrevState {
  lastFeed: number,
  feed: any;
  lastVersion: number;
  version: any;
}

// Initial state
const initialState: PrevState = {
  lastFeed: 0,
  feed: [],
  lastVersion: 0,
  version: [],
};

// Actual Slice
export const prevSlice = createSlice({
  name: "prev",
  initialState,
  reducers: {
    // Action to set the authentication status
    setFeed(state, action) {
      state.feed = action.payload;
    },
    setLastFeed(state, action) {
      state.lastFeed = action.payload;
    },
    setVersion(state, action) {
      state.version = action.payload;
    },
    setLastVersion(state, action) {
      state.lastVersion = action.payload;
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
  setFeed,
  setLastFeed,
  setVersion,
  setLastVersion
} = prevSlice.actions;

export const selectFeed = (state: AppStore) => state.prev.feed;
export const selectLastFeed = (state: AppStore) => state.prev.lastFeed;
export const selectVersion = (state: AppStore) => state.prev.version;
export const selectLastVersion = (state: AppStore) => state.prev.lastVersion;

export default prevSlice.reducer;