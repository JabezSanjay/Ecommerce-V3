import axios from '../../../axiosConfig';
import {
  signupUserError,
  signupUserInProgress,
  signupUserSuccess,
} from '../../../redux/reducers/authReducer';

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

export const signupUserGoogle = async (dispatch) => {
  try {
    dispatch(signupUserInProgress());
    window.open('http://localhost:4000/api/google', '_blank');
    // if (response.data.success) {
    //   dispatch(signupUserSuccess());
    // } else {
    //   dispatch(signupUserError(response.data.message));
    // }
    return;
  } catch (error) {
    await dispatch(signupUserError());
  }
};
