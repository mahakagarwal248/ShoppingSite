import { combineReducers } from "redux";
import userReducer from "./Users";
import productReducer from './Products';

export default combineReducers({
    userReducer, productReducer
})