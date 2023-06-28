import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {}, //{ _id: "", username: "", email: "" }
    errorMessage: null,
    status: "checking",
  },
  reducers: {
    _: (state, action) => {
      console.log(state, action);
    },
    verifyAuthentication: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.errorMessage = null;
      state.status = "authenticated";
      state.user = payload;
    },
    onLogout: (state, { payload }) => {
      state.errorMessage = payload;
      state.status = "not-authenticated";
      state.user = {};
    },
    clearError: (state) => {
      state.errorMessage = null;
    },
  },
});

export const {
  _,
  verifyAuthentication,
  onLogin,
  onLogout,
  clearError,
} = authSlice.actions;
