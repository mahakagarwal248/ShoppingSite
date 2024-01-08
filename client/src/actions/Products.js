import { toast } from 'react-toastify';
import * as api from '../api';

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllProducts();
    dispatch({ type: 'FETCH_ALL_PRODUCTS', payload: data });
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};
export const getProductByCategory = (value) => async (dispatch) => {
  try {
    const { data } = await api.getProductsByCategory(value.value);
    dispatch({ type: 'FETCH_PRODUCTS_BY_CATEGORY', payload: data });
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};
export const addProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(product);
    dispatch({ type: 'FETCH_PRODUCTS_BY_CATEGORY', payload: data });
    return toast.success(data);
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const getMerchantProducts = (merchantId) => async (dispatch) => {
  try {
    const { data } = await api.getMerchantProducts(merchantId);
    dispatch({ type: 'FETCH_MERCHANT_PRODUCTS', payload: data });
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};
