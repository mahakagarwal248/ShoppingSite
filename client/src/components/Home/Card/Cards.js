import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import panda from '../../../assets/panda.jpg';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {addToCart} from '../../../actions/Cart';
import { addToWishlist } from "../../../actions/Wishlist";

function Cards() {
  const productList = useSelector((state) => state.productReducer)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  var User = JSON.parse(localStorage.getItem('Profile'))

  const handleAddToCart = (e, id, productName, productDescription, productBrand, productPrice) => {
    e.preventDefault();
    if(localStorage.getItem('Profile') === null){
      alert("You need yo login first");
      navigate('/login')
    }
    dispatch(addToCart(id, {userId: User.result._id, name:productName, description:productDescription, brand:productBrand, price:productPrice, quantity:2}, navigate))
    navigate('/cart')
  }

  const handleAddToWishlist = (e, id, productName, productDescription, productBrand, productPrice) => {
    e.preventDefault();
    if(localStorage.getItem('Profile') === null){
      alert("You need yo login first");
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
      <div style={{margin:'20px'}} key={products._id}>
      <Card style={{ width: "16rem" }}>
        <Card.Img variant="top" src={panda} style={{height:'200px', width:'16rem'}} />
        <Card.Body>
          <Card.Title>{products.name}</Card.Title>
          <Card.Text>{products.description}</Card.Text>
          <Card.Text><b>INR {products.price}</b></Card.Text>
          <Button variant="primary" style={{width:'150px'}} onClick={(e) => handleAddToCart(e, products._id, products.name, products.description, products.brand, products.price)}>Add to Cart</Button>
          <br/>
          <Button variant="secondary" size="sm" style={{marginTop:'8px'}} onClick={(e) => handleAddToWishlist(e, products._id, products.name, products.description, products.brand, products.price)}>Add to Wishlist</Button>
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
