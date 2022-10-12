import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import buffer from 'buffer';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Tooltip from '@mui/material/Tooltip';

import '../Home.css';
import { addToCart, fetchCartProduct } from '../../../actions/Cart';
import { addToWishlist, fetchWishlistProduct } from '../../../actions/Wishlist';
import { getProductByCategory } from '../../../actions/Products';

function Cards(securityQuestionValue) {
  const productList = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductByCategory(securityQuestionValue));
  }, [dispatch, securityQuestionValue]);

  const handleClick = (id) => {
    navigate(`/productDetails/${id}`);
  };

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
    <>
      {productList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {productList.data?.data?.map(
            (products) => (
              (image = `data:${products.img.contentType};base64, ${buffer.Buffer.from(
                products.img.data
              ).toString('base64')}`),
              (
                <div className="card-div" key={products._id}>
                  <Card className="cards">
                    <Card.Img
                      variant="top"
                      src={image}
                      className="card-img"
                      onClick={() => handleClick(products._id)}
                    />
                    <Card.Body>
                      <div style={{ margin: 'auto' }}>
                        <Card.Title>{products.name}</Card.Title>
                        <Card.Text style={{ margin: '0' }}>{products.description}</Card.Text>
                        <Card.Text>
                          <b>INR {products.price}</b>
                        </Card.Text>
                      </div>

                      <div className="card-btn-div">
                        <Button
                          className="card-add-cart-btn"
                          onClick={(e) =>
                            handleAddToCart(
                              e,
                              products._id,
                              products.name,
                              products.description,
                              products.brand,
                              products.price,
                              products.img
                            )
                          }>
                          Add to Cart
                        </Button>
                        <Button
                          className="card-add-wishlist-btn"
                          size="sm"
                          onClick={(e) =>
                            handleAddToWishlist(
                              e,
                              products._id,
                              products.name,
                              products.description,
                              products.brand,
                              products.price,
                              products.img
                            )
                          }>
                          <Tooltip title="Add to wishlist">
                            <FavoriteBorderOutlinedIcon className="wishlist-icon" />
                          </Tooltip>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              )
            )
          )}
          ;
        </>
      )}
    </>
  );
}

export default Cards;
