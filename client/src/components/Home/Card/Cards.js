import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import panda from '../../../assets/panda.jpg';
import {useSelector} from 'react-redux'

function Cards() {
  const productList = useSelector((state) => state.productReducer)

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
          <Button variant="primary">Add to Cart</Button>
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
