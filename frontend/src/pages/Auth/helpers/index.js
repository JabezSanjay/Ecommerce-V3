import axios from '../../../axiosConfig';
import {
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
      dispatch(signinUserSuccess());
    } else {
      dispatch(signupUserError(response.data.message));
    }
    return response.data;
  } catch (error) {
    await dispatch(signupUserError());
  }
};

export const signInUserGoogle = async (dispatch) => {
  try {
    dispatch(signupUserInProgress());
    window.open('http://localhost:4000/api/google', '_blank');
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

export const isAuthenticated = async () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (await User.getUserDetails()) {
    return User.getUserDetails();
  } else {
    return false;
  }
};
