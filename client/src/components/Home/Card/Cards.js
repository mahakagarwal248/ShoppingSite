import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import panda from '../../../assets/panda.jpg';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Tooltip from '@mui/material/Tooltip';
import {addToCart} from '../../../actions/Cart';
import { addToWishlist } from "../../../actions/Wishlist";

function Cards() {
  const productList = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/productDetails/${id}`)
  }

  var User = JSON.parse(localStorage.getItem('Profile'))

  const handleAddToCart = (e, id, productName, productDescription, productBrand, productPrice) => {
    e.preventDefault();
    if(localStorage.getItem('Profile') === null){
      alert("You need to login first");
      navigate('/login')
    }
    dispatch(addToCart(id, {userId: User.result._id, name:productName, description:productDescription, brand:productBrand, price:productPrice, quantity:1}, navigate))
    navigate('/cart')
  }

  const handleAddToWishlist = (e, id, productName, productDescription, productBrand, productPrice) => {
    e.preventDefault();
    if(localStorage.getItem('Profile') === null){
      alert("You need to login first");
      navigate('/login')
    }
    dispatch(addToWishlist(id, {userId: User.result._id, name:productName, description:productDescription, brand:productBrand, price:productPrice}, navigate))
    navigate('/wishlist')
  }
  
  return (
    <>
    {productList.data === null ? <h1>Loading...</h1> 
    : 
    <>
    {productList.data.map((products)=> (
      <div style={{margin:'18px', cursor:'pointer'}} key={products._id}>
      <Card style={{ width: "16rem",border:'2px solid rgb(101,0,0)',padding:'0',margin:'0'}}>
        <Card.Img variant="top" src={panda} style={{height:'180px', width:'100%'}} onClick={() => handleClick(products._id)}/>
        <Card.Body>
          <Card.Title>{products.name}</Card.Title>
          <Card.Text style={{margin:'0'}}>{products.description}</Card.Text>
          <Card.Text><b>INR {products.price}</b></Card.Text>
          <Button style={{width:'150px',background: 'rgb(101,0,0,1)',border:'none'}} onClick={(e) => handleAddToCart(e, products._id, products.name, products.description, products.brand, products.price)}>Add to Cart</Button>
          <Button size="sm" style={{background:'transparent', color:'black',border:'none'}} onClick={(e) => handleAddToWishlist(e, products._id, products.name, products.description, products.brand, products.price)}>
            <Tooltip title="Add to wishlist">
              <FavoriteBorderOutlinedIcon style={{fontSize:'28px',marginLeft:'5px'}}/>
            </Tooltip>
          </Button>
        </Card.Body>
      </Card>
    </div>
    ))};
    </>
    }
    </>
  );
}

export default Cards;