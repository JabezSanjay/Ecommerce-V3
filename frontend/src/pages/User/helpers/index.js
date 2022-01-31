import axios from '../../../axiosConfig';
import {
  updatePasswordError,
  updatePasswordInProgress,
  updatePasswordSuccess,
  updateUserError,
  updateUserInProgress,
  updateUserSuccess,
} from '../../../redux/reducers/updateUserReducer';

export const updateUser = async (user, dispatch) => {
  try {
    dispatch(updateUserInProgress());
    let response = await axios.post('/user/update', user);
    if (response.data.success) {
      dispatch(updateUserSuccess());
    } else {
      dispatch(updateUserError(response.data.message));
    }
    return response.data;
  } catch (error) {
    await dispatch(updateUserError());
  }
};

export const changePassword = async (password, dispatch) => {
  try {
    dispatch(updatePasswordInProgress());
    let response = await axios.post('/user/change-password', password);
    if (response.data.success) {
      dispatch(updatePasswordSuccess());
    } else {
      dispatch(updatePasswordError(response.data.message));
    }
    return response.data;
  } catch (error) {
    await dispatch(updatePasswordError());
  }
};
