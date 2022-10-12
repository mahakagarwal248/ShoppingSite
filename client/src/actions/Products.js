import * as api from '../api';

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllProducts();
    dispatch({ type: 'FETCH_ALL_PRODUCTS', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getProductByCategory = (value) => async (dispatch) => {
  try {
    const data = await api.getProductsByCategory(value.value).then((res) => {
      return res;
    });
    dispatch({ type: 'FETCH_PRODUCTS_BY_CATEGORY', payload: data });
  } catch (error) {
    console.log(error);
  }
};
