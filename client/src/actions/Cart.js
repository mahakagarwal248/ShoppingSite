import { toast } from 'react-toastify';
import * as api from '../api';

export const addToCart = (userId, productId, navigate) => async (dispatch) => {
  try {
    const response = await api.addToCart(userId, productId);
    dispatch({ type: 'ADD_TO_CART' });
    navigate('/cart');
    return toast.success(response?.data);
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const fetchCartProduct = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const { data } = await api.getCartProducts(userId);
      dispatch({ type: 'FETCH_CART_PRODUCTS', payload: data });
    }
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const deleteCartProduct = (userId, productId) => async () => {
  try {
    await api.deleteCartProducts(userId, productId);
    return toast.success('Product deleted successfully');
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const updateQuantity = (userId, productId, quantity) => async () => {
  try {
    await api.updateQuantity(userId, productId, quantity);
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};
