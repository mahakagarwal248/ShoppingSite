import { combineReducers } from 'redux';
import userReducer from './Users';
import productReducer from './Products';
import cartReducer from './Cart';
import wishlistReducer from './Wishlist';
import imageReducer from './Images';
import businessProfileReducer from './BusinessProfile';
import ordersReducer from './Orders';
export default combineReducers({
  userReducer,
  productReducer,
  cartReducer,
  wishlistReducer,
  imageReducer,
  businessProfileReducer,
  ordersReducer
});
