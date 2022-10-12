import React from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import buffer from 'buffer';

import './ProductDetails.css';
import Navbar from '../Navbar/Navbar';
import { addToCart, fetchCartProduct } from '../../actions/Cart';
import { addToWishlist, fetchWishlistProduct } from '../../actions/Wishlist';

function ProductDetails() {
  const { id } = useParams();
  const productList = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User.result._id;

  const handleAddToCart = (
    e,
    id,
    productName,
    productDescription,
    productBrand,
    productPrice,
    productImg
  ) => {
    e.preventDefault();
    if (localStorage.getItem('Profile') === null) {
      alert('You need to login first');
      navigate('/login');
    }
    dispatch(
      addToCart(
        id,
        {
          userId: User.result._id,
          name: productName,
          description: productDescription,
          brand: productBrand,
          price: productPrice,
          quantity: 1,
          img: productImg
        },
        navigate
      )
    );
    dispatch(fetchCartProduct(userId));
    navigate('/cart');
  };

  const handleAddToWishlist = (
    e,
    id,
    productName,
    productDescription,
    productBrand,
    productPrice,
    productImg
  ) => {
    e.preventDefault();
    if (localStorage.getItem('Profile') === null) {
      alert('You need to login first');
      navigate('/login');
    }
    dispatch(
      addToWishlist(
        id,
        {
          userId: User.result._id,
          name: productName,
          description: productDescription,
          brand: productBrand,
          price: productPrice,
          img: productImg
        },
        navigate
      )
    );
    dispatch(fetchWishlistProduct(userId));
    navigate('/wishlist');
  };

  var image = {};
  return (
    <div className="container">
      <Navbar />
      {productList.data?.data
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
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) =>
                        handleAddToCart(
                          e,
                          product._id,
                          product.name,
                          product.description,
                          product.brand,
                          product.price,
                          product.img
                        )
                      }>
                      Add to cart
                    </button>
                    <br />
                    <button
                      className="add-to-wishlist-btn"
                      onClick={(e) =>
                        handleAddToWishlist(
                          e,
                          product._id,
                          product.name,
                          product.description,
                          product.brand,
                          product.price,
                          product.img
                        )
                      }>
                      Add to Wishlist
                    </button>
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
