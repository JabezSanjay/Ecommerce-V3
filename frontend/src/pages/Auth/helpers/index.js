import axios from '../../../axiosConfig';
import {
  forgotPasswordError,
  forgotPasswordInProgress,
  forgotPasswordSuccess,
  logoutUserError,
  logoutUserSuccess,
  resetPasswordError,
  resetPasswordInProgress,
  resetPasswordSuccess,
  signinUserError,
  signinUserInProgress,
  signinUserSuccess,
  signupUserError,
  signupUserInProgress,
  signupUserSuccess,
} from '../../../redux/reducers/authReducer';
import { User } from '../../../utils/cookieHelper';

export const signupUser = async (user, dispatch) => {
  try {
    dispatch(signupUserInProgress());
    let response = await axios.post('/signup', user);
    if (response.data.success) {
      dispatch(signupUserSuccess());
    } else {
      dispatch(signupUserError(response.data.message));
    }
    return response.data;
  } catch (error) {
    await dispatch(signupUserError());
  }
};

export const signinUser = async (user, dispatch) => {
  try {
    dispatch(signinUserInProgress());
    let response = await axios.post('/signin', user);
    if (response.data.success) {
      dispatch(signinUserSuccess(response.data.data));
    } else {
      dispatch(signinUserError(response.data.success));
    }
    return response.data;
  } catch (error) {
    await dispatch(signinUserError());
  }
};

export const logoutUser = async (dispatch) => {
  try {
    let response = await axios.get('/logout');
    User.clearUserDetails();
    if (response.data.success) {
      dispatch(logoutUserSuccess());
    } else {
      dispatch(logoutUserError(response.data.success));
    }
    return response.data;
  } catch (error) {
    await dispatch(logoutUserError());
  }
};

export const signInUserGoogle = async (dispatch) => {
  try {
    dispatch(signupUserInProgress());
    window.open('http://localhost:4000/api/google', '_self');
    console.log('HERE 1');
    return;
  } catch (error) {
    await dispatch(signupUserError());
  }
};

export const getUserDetails = async () => {
  let response;
  try {
    if (!isAuthenticated()) {
      return (response.data.success = false);
    }
    response = await axios.get('/user/me');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    console.log('HERE');
    return false;
  }
  if (User.getUserDetails()) {
    return User.getUserDetails();
  } else {
    return false;
  }
};

export const forgotPassword = async (email, dispatch) => {
  try {
    dispatch(forgotPasswordInProgress());
    let response = await axios.post('/forgot-password', email);
    if (response.data.success) {
      dispatch(forgotPasswordSuccess());
    } else {
      dispatch(forgotPasswordError(response.data.message));
    }
    return response.data;
  } catch (error) {
    await dispatch(forgotPasswordError());
  }
};

export const resetPassword = async (password, dispatch, token) => {
  try {
    dispatch(resetPasswordInProgress());
    let response = await axios.post(`/password/reset/${token}`, password);
    if (response.data.success) {
      dispatch(resetPasswordSuccess());
    } else {
      dispatch(resetPasswordError(response.data.message));
    }
    return response.data;
  } catch (error) {
    await dispatch(resetPasswordError());
  }
};
