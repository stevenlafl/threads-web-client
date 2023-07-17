import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppStore } from "./appStore";

// Type for our state
export interface AuthState {
  authState: boolean;
  challengeRequired: boolean;
  token: string | null;
  deviceId: string | null;
  userId: string | null;
  userName: string | null;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  challengeRequired: false,
  token: null,
  userId: null,
  deviceId: null,
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
    setToken(state, action) {
      state.token = action.payload;
    },
    setDeviceId(state, action) {
      state.deviceId = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setChallengeRequired(state, action) {
      state.challengeRequired = action.payload;
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type === HYDRATE,
        (state, action) => {
          return {
            ...state,
            ...action.payload.auth,
          };
        }
      );
  },
});

export const {
  setAuthState,
  setToken,
  setDeviceId,
  setUserId,
  setUserName,
  setChallengeRequired,
} = authSlice.actions;

export const selectAuthState = (state: AppStore) => state.auth.authState;
export const selectChallengeRequired = (state: AppStore) => state.auth.challengeRequired;
export const selectToken = (state: AppStore) => state.auth.token;
export const selectDeviceId = (state: AppStore) => state.auth.deviceId;
export const selectUserId = (state: AppStore) => state.auth.userId;
export const selectUserName = (state: AppStore) => state.auth.userName;

export default authSlice.reducer;