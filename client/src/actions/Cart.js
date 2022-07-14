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