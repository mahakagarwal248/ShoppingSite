import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./Wishlist.css";
import Navbar from "../Navbar/Navbar";
import panda from "../../assets/panda.jpg";
import {fetchWishlistProduct} from '../../actions/Wishlist'

function Wishlist() {
    const wishlistProductList = useSelector((state) => state.wishlistReducer);
  
    var User = JSON.parse(localStorage.getItem('Profile'))
    const userId = User.result._id;
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchWishlistProduct(userId))
    }, [dispatch, userId])
    
  
  return (
    <div className="wishlist-container">
      <Navbar />
      <br />
      <h2>Welcome to your wishlist</h2>
      {wishlistProductList.data === null ? <h1>Loading...</h1> : 
      wishlistProductList.data.length === 0 ? 
      <>
        <br/>
        <h4>You have nothing in wishlist</h4>
        <br/>
        <Link to="/">
            <button style={{border:'none', backgroundColor:'blue', color:'white',height:'40px', width:'150px', borderRadius:'5px'}}>Shop Now</button>
        </Link>
      </> 
      :
      <>
            <TableContainer component={Paper} style={{width:'70%', margin:'auto',marginTop:'25px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{border:'2px solid black',backgroundColor:'darkgrey'}}>
                <TableRow >
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600', width:'27%'}}>Name</TableCell>
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600'}}>Description</TableCell>
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600'}}>Price</TableCell>
                  <TableCell align="left" style={{fontSize:'17px', fontWeight:'600', width:'25%'}}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{border:'2px solid black'}}>
              {wishlistProductList.data.map((products) => (
                <>
                  <TableRow
                    key={products._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{borderBottom:'1px solid black'}}
                  >
                    <TableCell component="th" scope="row" style={{width:'27%'}}>
                      <>
                      <img src={panda} alt="product" style={{height:'70px', width:'70px', marginRight:'10px'}}/>
                      {products.name}
                      </>
                      
                    </TableCell>
                    <TableCell align="left">{products.description}</TableCell>
                    <TableCell align="left">{products.price}</TableCell>
                    <TableCell align="left" style={{width:'25%'}}>
                      <button className="cart-btn" style={{marginRight:'25px'}}>Add To Cart</button>
                      <button className="cart-btn">Delete</button>
                    </TableCell>
                  </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </>
}
    </div>
  )
}

export default Wishlist