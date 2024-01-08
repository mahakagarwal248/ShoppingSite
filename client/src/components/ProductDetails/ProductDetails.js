import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import './ProductDetails.css';
import { addToCart, fetchCartProduct } from '../../actions/Cart';
import { addToWishlist, fetchWishlistProduct } from '../../actions/Wishlist';

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productData = location.state;

  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User?.result?._id;

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    if (localStorage.getItem('Profile') === null) {
      alert('You need to login first');
      navigate('/login');
    }
    dispatch(addToCart(userId, productId, navigate));
    dispatch(fetchCartProduct(userId));
  };

  const handleAddToWishlist = (e, productId) => {
    e.preventDefault();
    if (localStorage.getItem('Profile') === null) {
      alert('You need to login first');
      navigate('/login');
    }
    dispatch(addToWishlist(userId, productId, navigate));
    dispatch(fetchWishlistProduct(userId));
  };

  var image = {};
  return (
    <div className="container" style={{ marginTop: '40px' }}>
      {productData &&
        ((image = `data:${productData.img.contentType};base64, ${productData.img.data}`),
        (
          <div className="product-div" key={productData._id}>
            <div className="product-div1">
              <img className="product-img" src={image} alt="product" />
            </div>
            <div className="product-div2">
              <h2>{productData.name}</h2>
              <p>{productData.description}</p>
              <p>
                <b>INR {productData.price}</b>
              </p>
              <p>Quantiy Available : {productData.quantity}</p>
              <div className="product-btn-div">
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => handleAddToCart(e, productData._id)}>
                  Add to cart
                </button>
                <br />
                <button
                  className="add-to-wishlist-btn"
                  onClick={(e) => handleAddToWishlist(e, productData._id)}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProductDetails;
