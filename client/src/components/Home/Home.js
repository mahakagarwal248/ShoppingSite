import React from 'react';
import Cards from './Card/Cards';
import './Home.css';

function Home() {
  return (
    <div className='home-container'>
        <h2>Welcome to your <i>Shopping Site</i></h2>
        <div>
        <Cards/>
        </div>
    </div>
  )
}

export default Home