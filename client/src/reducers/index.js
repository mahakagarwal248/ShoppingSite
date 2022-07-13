import { combineReducers } from "redux";
import userReducer from "./Users";
import productReducer from './Products';
import cartReducer from './Cart'

export default combineReducers({
    userReducer, productReducer, cartReducer
})