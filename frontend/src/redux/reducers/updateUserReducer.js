import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'userUpdate',
  initialState: {
    passwordChangeLoading: false,
    loading: false,
    error: false,
  },
  reducers: {
    updateUserInProgress: (state, action) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.error = false;
      state.loading = false;
    },
    updateUserError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    updatePasswordInProgress: (state, action) => {
      state.passwordChangeLoading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.error = false;
      state.passwordChangeLoading = false;
    },
    updatePasswordError: (state, action) => {
      state.error = true;
      state.passwordChangeLoading = false;
    },
  },
});

export const {
  updateUserInProgress,
  updateUserSuccess,
  updateUserError,
  updatePasswordInProgress,
  updatePasswordSuccess,
  updatePasswordError,
} = authSlice.actions;
export default authSlice.reducer;
