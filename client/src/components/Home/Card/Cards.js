import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import panda from '../../../assets/panda.jpg';
import {useSelector} from 'react-redux'

function Cards() {
  const productList = useSelector((state) => state.productReducer)
  console.log(productList)

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
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
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
