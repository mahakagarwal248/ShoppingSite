import * as api from '../api';

export const addToWishlist = (id, productData, navigate) => async (dispatch) => {
    try {
        const {data} = api.addToWishlist(id, productData);
        dispatch({type:'ADD_TO_WISHLIST', data})
        navigate('/wishlist')
    } catch (error) {
        console.log(error)
    }
}

export const fetchWishlistProduct = (userId) => async (dispatch) => {
    try {
        const {data} = await api.getWishlistProducts(userId);
        dispatch({type: 'FETCH_WISHLIST_PRODUCTS', payload:data})
      } catch (error) {
        console.log(error)
      }
}