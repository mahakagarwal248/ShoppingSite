import { toast } from 'react-toastify';
import * as api from '../api';

export const initiatePayment = async (userId) => {
  console.log('---', userId);
  try {
    const { data } = await api.initiatePayment(userId);
    // dispatch({ type: 'INITIATE_PAYMENT', payload: data }
    console.log(data);
    return data;
  } catch (error) {
    return toast.error(error.response?.data);
  }
};

export const paymentCallback = async (paymentData) => {
  try {
    const response = await api.paymentCallback(paymentData);
    return response;
  } catch (error) {
    return toast.error(error.response.data);
  }
};
