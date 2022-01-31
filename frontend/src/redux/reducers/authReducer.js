import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: {},
    loading: false,
    error: false,
    isLoggedIn: false,
  },
  reducers: {
    signupUserInProgress: (state, action) => {
      state.loading = true;
    },
    signupUserSuccess: (state, action) => {
      state.error = false;
      state.loading = false;
    },
    signupUserError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    signinUserInProgress: (state, action) => {
      state.loading = true;
    },
    signinUserSuccess: (state, action, update) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    signinUserError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    logoutUserSuccess: (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = {};
    },
    logoutUserError: (state, action) => {
      state.error = true;
    },
  },
});

export const {
  signupUserInProgress,
  signupUserSuccess,
  signupUserError,
  signinUserInProgress,
  signinUserSuccess,
  signinUserError,
  logoutUserSuccess,
  logoutUserError,
} = authSlice.actions;
export default authSlice.reducer;
