import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import "./Wishlist.css";
import Navbar from "../Navbar/Navbar";
import panda from "../../assets/panda.jpg";
import {fetchWishlistProduct} from '../../actions/Wishlist'

function Wishlist() {
    const wishlistProductList = useSelector((state) => state.wishlistReducer)
  
    var User = JSON.parse(localStorage.getItem('Profile'))
    const userId = User.result._id;
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchWishlistProduct(userId))
    }, [dispatch, userId])
    
  
  return (
    <div className="wishlist-container">
      <Navbar />
      <br />
      <h2>Welcome to your wishlist</h2>
      {wishlistProductList.data === null ? <h1>Loading...</h1> : 
      <>
        {wishlistProductList.data.map((products) => (
            <div className="display-wishlist-items-container" key={products._id}>
            <div>
              <div className="display-wishlist-items-container-1">
                <img src={panda} alt="product" />
              </div>
              <div className="display-wishlist-items-container-2">
                <h4>{products.name}</h4>
                <p>Product description</p>
                <span>
                  <b>INR 5000</b>
                </span><br/>
              </div>
            </div>
          </div>
        ))}
      </>
}
    </div>
  )
}

export default Wishlist