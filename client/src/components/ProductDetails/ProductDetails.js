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
              <div
                key={product._id}
                style={{ display: 'flex', width: '75%', margin: 'auto', marginTop: '25px' }}>
                <div style={{ flex: '0.5' }}>
                  <img
                    src={image}
                    alt="product"
                    style={{ height: '380px', width: '460px', marginRight: '10px' }}
                  />
                </div>
                <div style={{ flex: '0.5' }}>
                  <h2>{product.name}</h2>
                  <p style={{ fontSize: '20px' }}>{product.description}</p>
                  <br />
                  <p style={{ fontSize: '20px' }}>
                    <b>INR {product.price}</b>
                  </p>
                  <p>Available : {product.quantity}</p>
                  <br />
                  <br />
                  <br />
                  <div style={{ width: '200px' }}>
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
