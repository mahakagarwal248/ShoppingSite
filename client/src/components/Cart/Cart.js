import React from "react";
import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import panda from "../../assets/panda.jpg";

function Cart() {
  
  return (
    <div className="cart-container">
      <Navbar />
      <br />
      <h2>Welcome to your cart</h2>
      <div className="display-cart-items-container">
        <div>
          <div className="display-cart-items-container-1">
            <img src={panda} alt="product" />
          </div>
          <div className="display-cart-items-container-2">
            <h4>Product Name</h4>
            <p>Product description</p>
            <span>
              <b>INR 5000</b>
            </span><br/>
            <span>Quantity</span>
          </div>
        </div>
        <div>
          <div className="display-cart-items-container-1">
            <img src={panda} alt="product" />
          </div>
          <div className="display-cart-items-container-2">
            <h4>Product Name</h4>
            <p>Product description</p>
            <span>
              <b>INR 5000</b>
            </span><br/>
            <span>Quantity</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
