/* eslint linebreak-style: ["error", "windows"] */
import { combineReducers } from 'redux';
import userReducer from './Users';
import productReducer from './Products';
import cartReducer from './Cart';
import wishlistReducer from './Wishlist';
import imageReducer from './Images';

export default combineReducers({
  userReducer, productReducer, cartReducer, wishlistReducer, imageReducer,
});
