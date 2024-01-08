import { toast } from 'react-toastify';
import * as api from '../api';

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

export const login = (loginData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(loginData);
    dispatch({ type: 'AUTH', data });
    navigate('/');
    return toast.success('Logged In Successfully');
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

export const updatedPassword = (updatedPassword) => async (dispatch) => {
  try {
    await api.changePassword(updatedPassword);
    dispatch({ type: 'UPDATED_PASSWORD' });
    window.alert('Success');
  } catch (error) {
    console.log(error);
    if (error.message === 'Request failed with status code 404') {
      window.alert('User not registered');
    }
  }
};
