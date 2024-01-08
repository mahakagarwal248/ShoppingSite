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

import './Cart.css';
import { deleteCartProduct, fetchCartProduct, updateQuantity } from '../../actions/Cart';
import { Link, useNavigate } from 'react-router-dom';
import Payment from '../Payment/Payment';

function Cart() {
  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User?.result?._id;

  const getProducts = () => {
    dispatch(fetchCartProduct(userId));
  };

  useEffect(() => {
    getProducts();
  }, [userId]);

  const cartData = useSelector((state) => state.cartReducer);

  var total = 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (productId) => {
    dispatch(deleteCartProduct(userId, productId, navigate));
    getProducts();
  };

  const handleUpdate = (productId, quantity) => {
    dispatch(updateQuantity(userId, productId, quantity));
    getProducts();
  };

  const handleMinus = (productId, quantity) => {
    if (quantity === 1) {
      handleDelete(productId);
    }
    handleUpdate(productId, quantity - 1);
  };

  const handlePlus = (productId, quantity) => {
    handleUpdate(productId, quantity + 1);
  };

  const handleClick = (product) => {
    navigate(`/productDetails/${product?._id}`, { state: product });
    getProducts();
  };

  var image = {};
  return (
    <div className="cart-container container">
      <br />
      <h2>Welcome to your cart</h2>
      {!cartData ? (
        <h1>Loading...</h1>
      ) : cartData?.data === null ? (
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
                  <TableCell align="left" className="cart-table-cell0"></TableCell>
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
                {cartData?.data?.products.map(
                  (product) => (
                    (image = `data:${product?.productId?.img?.contentType};base64, ${product?.productId?.img?.data}`),
                    (
                      <TableRow
                        key={product?.productId?._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        className="cart-table-row">
                        <TableCell
                          component="th"
                          scope="row"
                          className="cart-table-bcell0"
                          onClick={() => handleClick(product?.productId)}>
                          <img src={image} alt="product" />
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell1">
                          {product?.productId?.name}
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell2">
                          {product?.productId?.description}
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell3">
                          <button
                            className="quantity-btn"
                            onClick={() => handleMinus(product?.productId?._id, product?.quantity)}>
                            -
                          </button>
                          {product?.quantity}
                          <button
                            className="quantity-btn"
                            onClick={() => handlePlus(product?.productId?._id, product.quantity)}>
                            +
                          </button>
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell4">
                          {product.quantity * product?.productId?.price}
                        </TableCell>
                        <TableCell align="left" className="cart-table-bcell5">
                          <button className="cart-btn">Buy Now</button>
                          <button
                            className="cart-delete-btn"
                            onClick={() => handleDelete(product?.productId?._id)}>
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
              {cartData?.data?.products?.map((product) => (
                <span key={product?.productId?._id}>
                  {(total = total + product.quantity * product?.productId?.price)}
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
                    <Payment userId={userId} />
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
