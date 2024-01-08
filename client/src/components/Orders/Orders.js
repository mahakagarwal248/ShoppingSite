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
import moment from 'moment';

import './Orders.css';
import { fetchUserOrders } from '../../actions/Orders';

function Orders() {
  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User.result._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProducts = () => {
    dispatch(fetchUserOrders(userId));
  };
  useEffect(() => {
    getProducts();
  }, [userId]);

  const ordersList = useSelector((state) => state.ordersReducer);

  const handleClick = (product) => {
    navigate(`/productDetails/${product}`, { state: product });
  };
  var image = {};
  return (
    <div className="orders-container container">
      <br />
      <h2>Details of Your Orders</h2>
      {!ordersList ? (
        <h1>Loading...</h1>
      ) : ordersList?.data === null || ordersList?.data?.length === 0 ? (
        <>
          <br />
          <h4>You have not ordered anything yet</h4>
          <br />
          <Link to="/">
            <button className="orders-shop-now-btn">Shop Now</button>
          </Link>
        </>
      ) : (
        <>
          <TableContainer className="orders-table-container" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="orders-table-head">
                <TableRow>
                  <TableCell className="orders-table-cell0" align="left"></TableCell>
                  <TableCell className="orders-table-cell1" align="left">
                    Name
                  </TableCell>
                  <TableCell align="left" className="orders-table-cell2">
                    Description
                  </TableCell>
                  <TableCell align="center" className="orders-table-cell3">
                    Quantity
                  </TableCell>
                  <TableCell align="center" className="orders-table-cell4">
                    Price
                  </TableCell>
                  <TableCell align="center" className="orders-table-cell5">
                    Ordered On
                  </TableCell>
                  <TableCell align="center" className="orders-table-cell5">
                    Status
                  </TableCell>
                  {/* <TableCell align="center" className="orders-table-cell5"></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody className="orders-table-body">
                {ordersList?.data?.map(
                  (product) => (
                    (image = `data:${product?.productId?.img.contentType};base64, ${product?.productId.img.data}`),
                    (
                      <TableRow
                        className="orders-table-row"
                        key={product._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell
                          className="orders-table-bcell0"
                          component="th"
                          scope="row"
                          onClick={() => handleClick(product.productId)}>
                          <img src={image} alt="product" />
                        </TableCell>
                        <TableCell align="left">{product?.productId?.name}</TableCell>
                        <TableCell align="left">{product?.productId?.description}</TableCell>
                        <TableCell align="center">{product?.quantity}</TableCell>
                        <TableCell align="center">{product?.amount}</TableCell>
                        <TableCell align="center">
                          {moment(product?.dateOfPurchase).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell align="center">
                          {product?.status.charAt(0).toUpperCase() +
                            product?.status.slice(1).toLowerCase()}
                        </TableCell>
                        {/* <TableCell align="center">
                          {product?.status === 'CONFIRMED' &&
                          moment(new Date()).diff(moment(product?.dateOfPurchase), 'hours') < 24 ? (
                            <button className="cancel-btn">Cancel</button>
                          ) : (
                            <></>
                          )}
                        </TableCell> */}
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

export default Orders;
