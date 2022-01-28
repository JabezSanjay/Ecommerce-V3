import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {},
    loading: false,
    error: false,
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
  },
});

export const { signupUserInProgress, signupUserSuccess, signupUserError } =
  authSlice.actions;
export default authSlice.reducer;
