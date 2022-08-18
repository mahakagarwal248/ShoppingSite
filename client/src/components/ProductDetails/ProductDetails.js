import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import buffer from 'buffer';

import './ProductDetails.css';
import Navbar from '../Navbar/Navbar';

function ProductDetails() {
  const { id } = useParams();
  const productList = useSelector((state) => state.productReducer);

  var image = {};
  return (
    <div className="container">
      <Navbar />
      {productList?.data
        ?.filter((product) => product._id === id)
        .map(
          (product) => (
            (image = `data:${product.img.contentType};base64, ${buffer.Buffer.from(
              product.img.data
            ).toString('base64')}`),
            (
              <div className="product-div" key={product._id}>
                <div className="product-div1">
                  <img className="product-img" src={image} alt="product" />
                </div>
                <div className="product-div2">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <br />
                  <p>
                    <b>INR {product.price}</b>
                  </p>
                  <p>Available : {product.quantity}</p>
                  <br />
                  <br />
                  <br />
                  <div className="product-btn-div">
                    <button className="add-to-cart-btn">Add to cart</button>
                    <br />
                    <button className="add-to-wishlist-btn">Add to Wishlist</button>
                  </div>
                </div>
              </div>
            )
          )
        )}
    </div>
  );
}

export default ProductDetails;
