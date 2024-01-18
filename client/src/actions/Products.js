import { toast } from 'react-toastify';
import * as api from '../api';

export const fetchAllProducts =
  ({ page, limit }) =>
  async (dispatch) => {
    try {
      const { data } = await api.getAllProducts(page, limit);
      dispatch({ type: 'FETCH_ALL_PRODUCTS', payload: data });
      return;
    } catch (error) {
      return toast.error(error.response.data);
    }
  };
export const getProductByCategory =
  ({ category, page, limit }) =>
  async (dispatch) => {
    try {
      const { data } = await api.getProductsByCategory(category, page, limit);
      dispatch({ type: 'FETCH_PRODUCTS_BY_CATEGORY', payload: data });
      return;
    } catch (error) {
      return toast.error(error.response.data);
    }
  };
export const addProduct = (product) => async () => {
  try {
    const { data } = await api.addProduct(product);
    return toast.success(data);
  } catch (error) {
    return toast.error(error.response.data);
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(product);
    dispatch({ type: 'SET_MODAL_PRODUCT', payload: data });
    dispatch(getMerchantProducts(product.merchantId));
    return toast.success('Product Updated Successfully');
  } catch (error) {
    return toast.error(error.response.data);
  }
};
export const deleteProduct =
  ({ merchantId, productId }) =>
  async () => {
    try {
      const { data } = await api.deleteProduct(merchantId, productId);
      console.log(data);
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
