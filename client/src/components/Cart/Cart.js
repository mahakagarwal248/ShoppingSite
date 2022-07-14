import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import panda from "../../assets/panda.jpg";
import { fetchCartProduct } from "../../actions/Cart";
import { Link } from "react-router-dom";

function Cart() {
  const cartProductList = useSelector((state) => state.cartReducer);
  console.log(cartProductList);

  var User = JSON.parse(localStorage.getItem("Profile"));
  const userId = User.result._id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartProduct(userId));
  }, [dispatch, userId]);

  return (
    <div className="cart-container">
      <Navbar />
      <br />
      <h2>Welcome to your cart</h2>
      {cartProductList.data === null ? (
        <h1>Loading...</h1>
      ) : cartProductList.data.length === 0 ? (
        <>
          <br />
          <h4>You have nothing in Cart</h4>
          <br/>
          <Link to="/">
            <button style={{border:'none', backgroundColor:'blue', color:'white',height:'40px', width:'150px', borderRadius:'5px'}}>Shop Now</button>
          </Link>
        </>
      ) : (
        <>
          {cartProductList.data.map((products) => (
            <div className="display-cart-items-container" key={products._id}>
              <div>
                <div className="display-cart-items-container-1">
                  <img src={panda} alt="product" />
                </div>
                <div className="display-cart-items-container-2">
                  <h4>{products.name}</h4>
                  <p>Product description</p>
                  <span>
                    <b>INR 5000</b>
                  </span>
                  <br />
                  <span>Quantity</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Cart;
