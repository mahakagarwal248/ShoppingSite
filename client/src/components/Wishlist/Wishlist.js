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
            <button className="wishlist-shop-now-btn">Shop Now</button>
          </Link>
        </>
      ) : (
        <>
          <TableContainer className="wishlist-table-container" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="wishlist-table-head">
                <TableRow>
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
                {wishlistProductList.data.map(
                  (products) => (
                    (image = `data:${products.img.contentType};base64, ${buffer.Buffer.from(
                      products.img.data
                    ).toString('base64')}`),
                    (
                      <TableRow
                        className="wishlist-table-row"
                        key={products._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell
                          className="wishlist-table-bcell1"
                          component="th"
                          scope="row"
                          onClick={() => handleClick(products.productId)}>
                          <>
                            <img src={image} alt="product" />
                            {products.name}
                          </>
                        </TableCell>
                        <TableCell align="left">{products.description}</TableCell>
                        <TableCell align="left">{products.price}</TableCell>
                        <TableCell align="left" className="wishlist-table-bcell4">
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
                            className="wishlist-delete-btn"
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
