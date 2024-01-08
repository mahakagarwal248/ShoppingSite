import { toast } from 'react-toastify';
import * as api from '../api';

export const addToWishlist = (userId, productId, navigate) => async (dispatch) => {
  try {
    const { data } = api.addToWishlist(userId, productId);
    dispatch({ type: 'ADD_TO_WISHLIST', data });
    navigate('/wishlist');
    return toast.success(data);
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const fetchWishlistProduct = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const { data } = await api.getWishlistProducts(userId);
      dispatch({ type: 'FETCH_WISHLIST_PRODUCTS', payload: data });
    }
    return;
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const deleteWishlistProduct = (userId, productId) => async (dispatch) => {
  try {
    const { data } = await api.deleteWishlistProducts(userId, productId);
    dispatch(fetchWishlistProduct(userId));
    return toast.success(data);
  } catch (error) {
    return toast.error(error.response.data);
  }
};
