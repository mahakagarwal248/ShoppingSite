import { combineReducers } from "redux";
import userReducer from "./Users";
import productReducer from './Products';
import cartReducer from './Cart';
import wishlistReducer from './Wishlist'

export default combineReducers({
    userReducer, productReducer, cartReducer, wishlistReducer
})