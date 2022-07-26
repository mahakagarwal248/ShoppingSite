import * as api from '../api';

export const postProfilePic = (userId, formData) => async (dispatch) => {
  try {
    api.postProfilePic(userId, formData);
    dispatch({ type: 'FILE' });
  } catch (error) {
    console.log(error);
  }
};
