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
    signinUserSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      state.error = false;
      state.loading = false;
    },
    signinUserError: (state, action) => {
      state.error = true;
      state.loading = false;
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
} = authSlice.actions;
export default authSlice.reducer;
