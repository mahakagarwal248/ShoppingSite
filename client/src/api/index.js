import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'})

export const signup = (userData) => API.post('/user/signup', userData);
export const login = (loginData) => API.post('user/login', loginData);

export const getAllProducts = () => API.get('/products/getAllProducts');

export const addToCart = (id, productData) => API.post(`/cart/addToCart/${id}`, {productData})