import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFail: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logOut: (state) => {
      state.login.currentUser = null;
      state.login.isFetching = false;
      state.login.error = false;
    },
  },
});

export const { loginStart, loginFail, loginSuccess, logOut } =
  authSlice.actions;

export default authSlice.reducer;
