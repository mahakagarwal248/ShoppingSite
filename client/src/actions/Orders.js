import { toast } from 'react-toastify';
import * as api from '../api';

export const fetchUserOrders = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const { data } = await api.getUserOrders(userId);
      dispatch({ type: 'FETCH_USER_ORDERS', payload: data });
    }
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const fetchMerchantOrders = (merchantId) => async (dispatch) => {
  try {
    if (merchantId) {
      const { data } = await api.getMerchantOrders(merchantId);
      dispatch({ type: 'FETCH_MERCHANT_ORDERS', payload: data });
    }
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};
