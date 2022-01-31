import axios from '../../../axiosConfig';
import {
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
