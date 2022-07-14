import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'})

export const signup = (userData) => API.post('/user/signup', userData);
export const login = (loginData) => API.post('user/login', loginData);

export const getAllProducts = () => API.get('/products/getAllProducts');

export const addToCart = (id, productData) => API.post(`/cart/addToCart/${id}`, {productData});
export const getCartProducts = (id) => API.get(`/cart/getCartProduct/${id}`)

export const addToWishlist = (id, productData) => API.post(`/cart/addToWishlist/${id}`, {productData});
export const getWishlistProducts = (id) => API.get(`/cart/getWishlistProduct/${id}`)