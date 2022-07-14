import * as api from '../api';

export const addToCart = (id, productData, navigate) => async (dispatch) => {
    try {
        const {data} = api.addToCart(id, productData);
        dispatch({type:'ADD_TO_CART', data})
        navigate('/cart')
    } catch (error) {
        console.log(error)
    }
}

export const fetchCartProduct = (userId) => async (dispatch) => {
    try {
        const {data} = await api.getCartProducts(userId);
        dispatch({type: 'FETCH_CART_PRODUCTS', payload:data})
      } catch (error) {
        console.log(error)
      }
}