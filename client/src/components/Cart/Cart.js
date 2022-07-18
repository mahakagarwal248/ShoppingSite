import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import panda from "../../assets/panda.jpg";
import { deleteCartProduct, fetchCartProduct, updateQuantity } from "../../actions/Cart";
import { Link, useNavigate } from "react-router-dom";

function Cart() {

  const cartProductList = useSelector((state) => state.cartReducer);

  var User = JSON.parse(localStorage.getItem("Profile"));
  const userId = User.result._id;

  var total = 0
  // {cartProductList?.data?.map((products) => (
  //   total = total + products.price
  // ))}

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartProduct(userId));
  }, [dispatch, userId]);

  const handleDelete = (id) => {
    dispatch(deleteCartProduct(id, navigate))
  }

  const handleMinus = (id, quantity) =>{
    if(quantity === 1 ){
      dispatch(deleteCartProduct(id, navigate))
      dispatch(fetchCartProduct(userId))
    }
    dispatch(updateQuantity(id, {quantity:quantity-1}))
    dispatch(fetchCartProduct(userId))
  }

  const handlePlus = (id, quantity) =>{
    dispatch(updateQuantity(id, {quantity:quantity+1}))
    dispatch(fetchCartProduct(userId))
  }

  const handleClick = (id) => {
    navigate(`/productDetails/${id}`)
    dispatch(fetchCartProduct(userId))
  }

  return (
    <div className="cart-container">
      <Navbar />
      <br />
      <h2>Welcome to your cart</h2>
      {cartProductList.data === null ? (
        <h1>Loading...</h1>
      ) : cartProductList.data.length === 0 ? (
        <>
          <br />
          <h4>You have nothing in Cart</h4>
          <br/>
          <Link to="/">
            <button style={{border:'none', backgroundColor:'blue', color:'white',height:'40px', width:'150px', borderRadius:'5px'}}>Shop Now</button>
          </Link>
        </>
      ) : (
        <>
            <TableContainer component={Paper} style={{width:'70%', margin:'auto',marginTop:'25px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{border:'2px solid black',backgroundColor:'darkgrey'}}>
                <TableRow >
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600', width:'28%'}}>Name</TableCell>
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600', width:'28%'}}>Description</TableCell>
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600', width:'15%'}}>Quantity</TableCell>
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600', width:'7%'}}>Price</TableCell>
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600', width:'22%'}}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{border:'2px solid black'}}>
              {cartProductList.data.map((products) => (
                  <TableRow
                    key={products._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{borderBottom:'1px solid black', cursor:'pointer'}}
                  >
                    <TableCell component="th" scope="row" style={{width:'28%'}} onClick={() => handleClick(products.productId)}>
                      <>
                      <img src={panda} alt="product" style={{height:'70px', width:'70px', marginRight:'10px'}}/>
                      {products.name}
                      </>
                      
                    </TableCell>
                    <TableCell align="left" style={{width:'28%'}}>{products.description}</TableCell>
                    <TableCell align="left" style={{width:'15%'}}>
                      <button className="quantity-btn" onClick={() => handleMinus(products._id, products.quantity)}>-</button>
                      {products.quantity}
                      <button className="quantity-btn" onClick={() => handlePlus(products._id, products.quantity)}>+</button>
                    </TableCell>
                    <TableCell align="left" style={{width:'7%'}}>{ products.quantity * products.price}</TableCell>
                    <TableCell align="left" style={{width:'22%'}}>
                      <button className="cart-btn" style={{marginRight:'25px'}}>Buy Now</button>
                      <button style={{background:'transparent', border:'none'}} onClick={() => handleDelete(products._id)}><DeleteOutlinedIcon/></button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div style={{display:'none'}}>
            {cartProductList.data.map((products) => (
                <span key={products._id}>{total= total + products.quantity * products.price}</span>
            ))}
            </div>
            <Table style={{border:'2px solid black'}}>
              <TableBody>
              <TableRow>
                <TableCell>Total Amount</TableCell>
                <TableCell align="right" style={{fontSize:'18px'}}><b>{total}</b></TableCell>
                <TableCell align="center" style={{width:'21%'}}>
                  <button className="checkout-btn">Checkout</button>
                </TableCell>
              </TableRow>
              </TableBody>
              
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default Cart;
