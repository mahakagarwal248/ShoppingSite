import * as api from '../api';

export const addToCart = (productData, navigate) => async (dispatch) => {
    try {
        const {data} = api.addToCart(productData);
        dispatch({type:'ADD_TO_CART', data})
        navigate('/cart')
    } catch (error) {
        console.log(error)
    }
}