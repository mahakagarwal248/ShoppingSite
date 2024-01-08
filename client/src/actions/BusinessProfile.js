import { toast } from 'react-toastify';
import * as api from '../api';

export const addProfile = (profileData) => async (dispatch) => {
  try {
    const { data } = await api.addProfile(profileData);
    dispatch({ type: 'ADD_PROFILE', payload: data });
    dispatch({ type: 'FETCH_PROFILE_BY_ID', payload: data });
    return toast.success(data);
  } catch (error) {
    return toast.error(error.response?.data);
  }
};

export const getProfileById = (merchantId) => async (dispatch) => {
  try {
    const { data } = await api.getProfileById(merchantId);
    dispatch({ type: 'FETCH_PROFILE_BY_ID', payload: data });
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const deleteProfile = (merchantId) => async (dispatch) => {
  try {
    const { data } = await api.deleteProfile(merchantId);
    dispatch({ type: 'DELETE_PROFILE', payload: data });
    return toast.success(data);
  } catch (error) {
    return toast.error(error?.response?.data);
  }
};
