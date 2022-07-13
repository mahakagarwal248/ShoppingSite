import * as api from '../api'

export const fetchAllProducts = () => async (dispatch) => {
    try {
      const {data} = await api.getAllProducts();
      dispatch({type: 'FETCH_ALL_PRODUCTS', payload:data})
    } catch (error) {
      console.log(error)
    }
  }