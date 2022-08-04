import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import buffer from 'buffer';

import './Wishlist.css';
import Navbar from '../Navbar/Navbar';
import { fetchWishlistProduct } from '../../actions/Wishlist';
import { addToCart } from '../../actions/Cart';
import { deleteWishlistProduct } from '../../actions/Wishlist';

function Wishlist() {
  const wishlistProductList = useSelector((state) => state.wishlistReducer);
  console.log(wishlistProductList);

  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User.result._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWishlistProduct(userId));
  }, [dispatch, userId]);

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
          quantity: 2,
          img: productImg
        },
        navigate
      )
    );
    handleDelete(id);
    navigate('/cart');
  };

  const handleDelete = (id) => {
    dispatch(deleteWishlistProduct(id, navigate));
    dispatch(fetchWishlistProduct(userId));
  };

  const handleClick = (id) => {
    navigate(`/productDetails/${id}`);
  };
  var image = {};
  return (
    <div className="wishlist-container container">
      <Navbar />
      <br />
      <h2>Welcome to your wishlist</h2>
      {wishlistProductList.data === null ? (
        <h1>Loading...</h1>
      ) : wishlistProductList.data.length === 0 ? (
        <>
          <br />
          <h4>You have nothing in wishlist</h4>
          <br />
          <Link to="/">
            <button
              style={{
                border: 'none',
                background: '#800000',
                color: 'white',
                height: '40px',
                width: '150px',
                borderRadius: '5px'
              }}>
              Shop Now
            </button>
          </Link>
        </>
      ) : (
        <>
          <TableContainer
            component={Paper}
            style={{ width: '70%', margin: 'auto', marginTop: '25px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                style={{
                  border: '2px solid #800000',
                  backgroundColor: 'darkgrey'
                }}>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: '17px',
                      fontWeight: '600',
                      width: '27%'
                    }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: '17px', fontWeight: '600' }}>
                    Description
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: '17px', fontWeight: '600' }}>
                    Price
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontSize: '17px',
                      fontWeight: '600',
                      width: '25%'
                    }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ border: '2px solid #800000' }}>
                {wishlistProductList.data.map(
                  (products) => (
                    (image = `data:${products.img.contentType};base64, ${buffer.Buffer.from(
                      products.img.data
                    ).toString('base64')}`),
                    (
                      <TableRow
                        key={products._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{ borderBottom: '1px solid black' }}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: '27%' }}
                          onClick={() => handleClick(products.productId)}>
                          <>
                            <img
                              src={image}
                              alt="product"
                              style={{
                                height: '70px',
                                width: '70px',
                                marginRight: '10px'
                              }}
                            />
                            {products.name}
                          </>
                        </TableCell>
                        <TableCell align="left">{products.description}</TableCell>
                        <TableCell align="left">{products.price}</TableCell>
                        <TableCell align="left" style={{ width: '25%' }}>
                          <button
                            className="cart-btn"
                            style={{ marginRight: '25px' }}
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
                            Add To Cart
                          </button>
                          <button
                            style={{ background: 'transparent', border: 'none' }}
                            onClick={() => handleDelete(products._id)}>
                            <Tooltip title="Delete" placement="top">
                              <DeleteOutlinedIcon />
                            </Tooltip>
                          </button>
                        </TableCell>
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default Wishlist;
