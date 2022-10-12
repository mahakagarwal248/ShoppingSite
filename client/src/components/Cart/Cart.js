import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

import './Cart.css';
import Navbar from '../Navbar/Navbar';
import { deleteCartProduct, fetchCartProduct, updateQuantity } from '../../actions/Cart';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const cartProductList = useSelector((state) => state.cartReducer);

  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User.result._id;

  var total = 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCartProduct(userId));
  }, [dispatch, userId]);

  const handleDelete = (id) => {
    dispatch(deleteCartProduct(id, navigate)).then();
    dispatch(fetchCartProduct(userId));
  };

  const handleMinus = (id, quantity) => {
    if (quantity === 1) {
      dispatch(deleteCartProduct(id, navigate));
      dispatch(fetchCartProduct(userId));
    }
    dispatch(updateQuantity(id, { quantity: quantity - 1 }));
    dispatch(fetchCartProduct(userId));
  };

  const handlePlus = (id, quantity) => {
    dispatch(updateQuantity(id, { quantity: quantity + 1 }));
    dispatch(fetchCartProduct(userId));
  };

  const handleClick = (id) => {
    navigate(`/productDetails/${id}`);
    dispatch(fetchCartProduct(userId));
  };
  var image = {};
  return (
    <div className="cart-container container">
      <Navbar />
      <br />
      <h2>Welcome to your cart</h2>
      {cartProductList.data === null ? (
        <h1>Loading...</h1>
      ) : cartProductList.data.length === 0 ? (
        <>
          <br />
          <h4>You have nothing in Cart</h4>
          <br />
          <Link to="/">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </>
      ) : (
        <>
          <TableContainer component={Paper} className="cart-table-container">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="cart-table-head">
                <TableRow>
                  <TableCell align="left" className="cart-table-cell1">
                    Name
                  </TableCell>
                  <TableCell align="left" className="cart-table-cell2">
                    Description
                  </TableCell>
                  <TableCell align="left" className="cart-table-cell3">
                    Quantity
                  </TableCell>
                  <TableCell align="left" className="cart-table-cell4">
                    Price
                  </TableCell>
                  <TableCell align="left" className="cart-table-cell5">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="cart-table-body">
                {cartProductList.data.map(
                  (products) => (
                    (image = `data:${products.img.contentType};base64, ${buffer.Buffer.from(
                      products.img.data
                    ).toString('base64')}`),
                    (
                      <TableRow
                        key={products._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        className="cart-table-row">
                        <TableCell
                          component="th"
                          scope="row"
                          className="cart-table-bcell1"
                          onClick={() => handleClick(products.productId)}>
                          <>
                            <img src={image} alt="product" />
                            {products.name}
                          </>
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell2">
                          {products.description}
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell3">
                          <button
                            className="quantity-btn"
                            onClick={() => handleMinus(products._id, products.quantity)}>
                            -
                          </button>
                          {products.quantity}
                          <button
                            className="quantity-btn"
                            onClick={() => handlePlus(products._id, products.quantity)}>
                            +
                          </button>
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell4">
                          {products.quantity * products.price}
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell5">
                          <button className="cart-btn">Buy Now</button>
                          <button
                            className="cart-delete-btn"
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
            <div style={{ display: 'none' }}>
              {cartProductList.data.map((products) => (
                <span key={products._id}>
                  {(total = total + products.quantity * products.price)}
                </span>
              ))}
            </div>
            <Table className="total-table">
              <TableBody>
                <TableRow>
                  <TableCell>Total Amount</TableCell>
                  <TableCell align="right" className="total-table-cell1">
                    <b>{total}</b>
                  </TableCell>
                  <TableCell align="center" className="total-table-cell2">
                    <button className="checkout-btn">Checkout</button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Link to="/">
            <button className="cart-add-products-btn">Add More Products</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
