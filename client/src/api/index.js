import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const signup = (userData) => API.post('/user/signup', userData);
export const login = (loginData) => API.post('/user/login', loginData);
export const getSecurityQues = (email) => API.get(`/user/getSecurityQues/${email}`);
export const forgotPassword = (answerData) => API.post('/user/forgotPassword/', answerData);
export const changePassword = (updatedPassword) =>
  API.patch('user/changePassword', updatedPassword);

export const getAllProducts = () => API.get('/products/getAllProducts');
export const getProductsByCategory = (value) => API.get(`/products/getProductByCategory/${value}`);

export const addToCart = (id, productData) =>
  API.post(`/cart/addToCart/${id}`, { productData, headers: 'image/png' });
export const getCartProducts = (id) => API.get(`/cart/getCartProduct/${id}`);
export const deleteCartProducts = (id) => API.patch(`/cart/deleteProduct/${id}`);
export const updateQuantity = (id, quantity) => API.patch(`/cart/updateQuantity/${id}`, quantity);

export const addToWishlist = (id, productData) =>
  API.post(`/wishlist/addToWishlist/${id}`, { productData, headers: 'image/png' });
export const getWishlistProducts = (id) => API.get(`/wishlist/getWishlistProduct/${id}`);
export const deleteWishlistProducts = (id) => API.patch(`/wishlist/deleteFromWishlist/${id}`);

export const postProfilePic = (id, formData) =>
  API.post(`/images/postImage/${id}`, formData, {
    headers: 'image/png'
  });
