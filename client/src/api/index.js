import axios from 'axios';

// const API = axios.create({ baseURL: 'https://uninterested-erin-woodpecker.cyclic.app/' });
const API = axios.create({ baseURL: 'http://localhost:5000' });

export const signup = (userData) => API.post('/user/signup', userData);
export const login = (loginData) => API.post('/user/login', loginData);
export const getUsers = () => API.get('/user/getAllUsers');
export const getSecurityQues = (email) => API.get(`/user/getSecurityQues/${email}`);
export const forgotPassword = (answerData) => API.post('/user/forgotPassword/', answerData);
export const changePassword = (updatePasswordObj) =>
  API.put('user/changePassword', updatePasswordObj);
export const sendOtp = (email) => API.get(`/otp-verification/?email=${email}`);
export const verifyOtp = (otpData) => API.post('/otp-verification', otpData);

export const getAllProducts = () => API.get('/products/getAllProducts');
export const getProductsByCategory = (value) => API.get(`/products/getProductByCategory/${value}`);

export const addToCart = (userId, productId) => {
  return API.get(`/cart/addToCart?userId=${userId}&productId=${productId}`);
};
export const getCartProducts = (userId) => API.get(`/cart/getCartProduct?userId=${userId}`);
export const deleteCartProducts = (userId, productId) =>
  API.delete(`/cart/deleteProduct?userId=${userId}&productId=${productId}`);
export const updateQuantity = (userId, productId, quantity) =>
  API.get(`/cart/updateQuantity?userId=${userId}&productId=${productId}&quantity=${quantity}`);

export const addToWishlist = (userId, productId) =>
  API.get(`/wishlist/add?userId=${userId}&productId=${productId}`);
export const getWishlistProducts = (userId) => API.get(`/wishlist?userId=${userId}`);
export const deleteWishlistProducts = (userId, productId) =>
  API.delete(`/wishlist?userId=${userId}&productId=${productId}`);

export const postProfilePic = (id, formData) =>
  API.post(`/images/postImage/${id}`, formData, {
    headers: 'image/png'
  });

export const initiatePayment = (userId) => API.get(`/payment/initiate?userId=${userId}`);
export const paymentCallback = (data) => API.post('/payment/callback', data);

export const getUserOrders = (userId) => API.get(`/orders?userId=${userId}`);

//dashboard apis
export const addProduct = (product) =>
  API.post('/products/addProduct', product, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW`
    }
  });
export const getMerchantProducts = (merchantId) =>
  API.get(`/products/getMerchantProducts?merchantId=${merchantId}`);
export const updateProduct = (data) => API.put('/products/update', data);
export const deleteProduct = (merchantId, productId) =>
  API.delete(`/products/delete?merchantId=${merchantId}&productId=${productId}`);

export const addProfile = (profileData) => API.post('/business-profile', profileData);
export const getProfileById = (merchantId) => API.get(`/business-profile?merchantId=${merchantId}`);
export const deleteProfile = (merchantId) =>
  API.delete(`/business-profile?merchantId=${merchantId}`);
