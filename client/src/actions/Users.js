import { toast } from 'react-toastify';
import * as api from '../api';
import { setModalStep, showModal } from './Common';

export const signup = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(userData);
    dispatch({ type: 'AUTH', data });
    navigate('/');
    return toast.success('Registered Successful');
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const login = (loginData) => async (dispatch) => {
  try {
    const { data } = await api.login(loginData);
    dispatch({ type: 'AUTH', data });
    // navigate(redirectionPath);
    toast.success('Logged In Successfully');
    return data;
  } catch (error) {
    if (error.message === 'Request failed with status code 400') {
      return toast.error('Invalid Password');
    } else if (error.message === 'Request failed with status code 404') {
      return toast.error("User doesn't exist");
    }
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: 'GET_ALL_USERS', data });
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const getSecurityQuestion = (email) => async (dispatch) => {
  try {
    const data = await api.getSecurityQues(email);
    dispatch({ type: 'GET_SECURITY_QUES', data });
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};
export const forgotPassword = (answerData, setEditPw) => async (dispatch) => {
  try {
    await api.forgotPassword(answerData);
    dispatch({ type: 'FORGOT_PASSWORD' });
    setEditPw(true);
    return;
  } catch (error) {
    if (error.message === 'Request failed with status code 400') {
      return toast.error("Answer doesn't match");
    } else if (error.message === 'Request failed with status code 404') {
      return toast.error("User doesn't exist");
    } else return toast.error(error.response.data);
  }
};

export const sendOtp = (email) => async (dispatch) => {
  try {
    const response = await api.sendOtp(email);
    if (response.status !== 200) return toast.error(response?.data);

    dispatch({ type: 'FORGOT_PASSWORD', data: email });
    dispatch(setModalStep(3));
    return toast.success(response?.data);
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data);
  }
};

export const verifyOtp = (otpData) => async (dispatch) => {
  try {
    const response = await api.verifyOtp(otpData);
    if (response.status !== 200) return toast.error(response?.data);
    dispatch(setModalStep(4));
    dispatch({ type: 'VERIFY_PASSWORD' });
    return toast.success(response?.data);
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const updatePassword = (updatePasswordObj) => async (dispatch) => {
  try {
    const response = await api.changePassword(updatePasswordObj);
    if (response.status !== 200) return toast.error(response?.data);
    dispatch(showModal(false));
    dispatch(setModalStep(0));
    dispatch({ type: 'UPDATED_PASSWORD' });
    return toast.success(response?.data);
  } catch (error) {
    return toast.error(error.response.data);
  }
};
