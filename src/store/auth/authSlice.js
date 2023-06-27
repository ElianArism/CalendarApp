import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      username: "",
      email: "",
      password: "",
    },
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
  },
});

export const { _, verifyAuthentication, onLogin } = authSlice.actions;
