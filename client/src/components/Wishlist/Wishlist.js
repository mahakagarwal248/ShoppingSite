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

import './Wishlist.css';
import { fetchWishlistProduct } from '../../actions/Wishlist';
import { addToCart } from '../../actions/Cart';
import { deleteWishlistProduct } from '../../actions/Wishlist';

function Wishlist() {
  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User.result._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProducts = () => {
    dispatch(fetchWishlistProduct(userId));
  };
  useEffect(() => {
    getProducts();
  }, [userId]);

  const wishlistProductList = useSelector((state) => state.wishlistReducer);

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    if (localStorage.getItem('Profile') === null) {
      alert('You need to login first');
      navigate('/login');
    }
    const response = dispatch(addToCart(userId, productId, navigate));
    console.log(response);
    handleDelete(productId);
    navigate('/cart');
  };

  const handleDelete = (productId) => {
    dispatch(deleteWishlistProduct(userId, productId, navigate));
    getProducts();
  };

  const handleClick = (product) => {
    navigate(`/productDetails/${product?._id}`, { state: product });
  };
  var image = {};
  return (
    <div className="wishlist-container container">
      <br />
      <h2>Welcome to your wishlist</h2>
      {!wishlistProductList ? (
        <h1>Loading...</h1>
      ) : wishlistProductList?.data === null ||
        wishlistProductList?.data?.products?.length === 0 ? (
        <>
          <br />
          <h4>You have nothing in wishlist</h4>
          <br />
          <Link to="/">
            <button className="wishlist-shop-now-btn">Shop Now</button>
          </Link>
        </>
      ) : (
        <>
          <TableContainer className="wishlist-table-container" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="wishlist-table-head">
                <TableRow>
                  <TableCell className="wishlist-table-cell0" align="left"></TableCell>
                  <TableCell className="wishlist-table-cell1" align="left">
                    Name
                  </TableCell>
                  <TableCell align="left" className="wishlist-table-cell2">
                    Description
                  </TableCell>
                  <TableCell align="left" className="wishlist-table-cell3">
                    Price
                  </TableCell>
                  <TableCell className="wishlist-table-cell4" align="left">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="wishlist-table-body">
                {wishlistProductList?.data?.products.map(
                  (product) => (
                    (image = `data:${product.img.contentType};base64, ${product.img.data}`),
                    (
                      <TableRow
                        className="wishlist-table-row"
                        key={product._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell
                          className="wishlist-table-bcell1"
                          component="th"
                          scope="row"
                          onClick={() => handleClick(product)}>
                          <img src={image} alt="product" />
                        </TableCell>
                        <TableCell align="left">{product.name}</TableCell>
                        <TableCell align="left">{product.description}</TableCell>
                        <TableCell align="left">{product.price}</TableCell>
                        <TableCell align="left" className="wishlist-table-bcell4">
                          <button
                            className="cart-btn"
                            style={{ marginRight: '25px' }}
                            onClick={(e) => handleAddToCart(e, product._id)}>
                            Add To Cart
                          </button>
                          <button
                            className="wishlist-delete-btn"
                            onClick={() => handleDelete(product._id)}>
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
