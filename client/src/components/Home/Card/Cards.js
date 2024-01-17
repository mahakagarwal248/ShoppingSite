import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Tooltip from '@mui/material/Tooltip';

import '../Home.css';
import { addToCart, fetchCartProduct } from '../../../actions/Cart';
import { addToWishlist, fetchWishlistProduct } from '../../../actions/Wishlist';
import { getProductByCategory } from '../../../actions/Products';

function Cards({ category }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (category !== 'all') {
      dispatch(getProductByCategory(category));
    }
  }, [dispatch, category]);

  const productList = useSelector((state) => state?.productReducer?.data?.productList);

  const handleClick = (productData) => {
    navigate(`/productDetails/${productData._id}`, { state: productData });
  };

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
    <>
      {!productList ? (
        <h1>Loading...</h1>
      ) : productList.length === 0 ? (
        <div>
          <h3>No Products Available Right Now</h3>
          <p>Please come back after some time</p>
        </div>
      ) : (
        <>
          {productList?.map(
            (products) => (
              (image = `data:${products.img.contentType};base64, ${products.img.data}`),
              (
                <div className="card-div" key={products._id}>
                  <Card className="cards">
                    <Card.Img
                      variant="top"
                      src={image}
                      className="card-img"
                      onClick={() => handleClick(products)}
                    />
                    <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ margin: 'auto' }}>
                        <Card.Title style={{ margin: 0, fontSize: '20px' }}>
                          {products.name}
                        </Card.Title>
                        {/* <Card.Text style={{ margin: '5px 0px', fontSize: '16px' }}>
                          {products.description}
                        </Card.Text> */}
                        <Card.Text style={{ marginTop: '10px' }}>
                          {products?.brand && (
                            <span style={{ fontSize: '16px', marginBottom: 0 }}>
                              Brand - {products?.brand}
                            </span>
                          )}
                          <br />
                          <span style={{ fontSize: '16px', marginBottom: 0, marginTop: 0 }}>
                            Price - INR {products.price}
                          </span>
                          <br />
                          <span style={{ fontSize: '16px', marginTop: 0 }}>
                            Quantity Available - 5
                          </span>
                        </Card.Text>
                      </div>

                      <div style={{ marginTop: '10px' }}>
                        <Button
                          className="card-add-cart-btn"
                          onClick={(e) => handleAddToCart(e, products._id)}>
                          Add to Cart
                        </Button>
                        <Button
                          className="card-add-wishlist-btn"
                          size="sm"
                          onClick={(e) => handleAddToWishlist(e, products._id)}>
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
