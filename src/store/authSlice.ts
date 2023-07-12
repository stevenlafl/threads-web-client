import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppStore } from "./appStore";

// Type for our state
export interface AuthState {
  authState: boolean;
  userId: string | null;
  userName: string | null;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  userId: null,
  userName: null,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const {
  setAuthState,
  setUserId,
  setUserName,
} = authSlice.actions;

export const selectAuthState = (state: AppStore) => state.auth.authState;
export const selectUserId = (state: AppStore) => state.auth.userId;
export const selectUserName = (state: AppStore) => state.auth.userName;

export default authSlice.reducer;