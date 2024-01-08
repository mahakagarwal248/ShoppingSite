import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cards from './Card/Cards';
import './Home.css';
import { fetchAllProducts } from '../../actions/Products';

function Home() {
  const [securityQuestionValue, setSecurityQuestionValue] = useState('all');

  const dispatch = useDispatch();
  const fetchProducts = () => {
    dispatch(fetchAllProducts());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <section className="landing my-0">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large" style={{ color: '#fff' }}>
              Welcome to your <i>Shopping Site</i> <br />
              Explore Everything You Need
            </h1>
            <p className="lead">Shop at an effordable price</p>
          </div>
        </div>
      </section>
      <div style={{ marginTop: '10px' }}>
        <p>Search By Category</p>
        <select
          value={securityQuestionValue}
          onChange={(e) => setSecurityQuestionValue(e.target.value)}>
          <option value="" hidden>
            Select Category
          </option>
          <option value="all">All</option>
          <option value="bottles">Bottles</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="mobile & accessories">Mobile & accessories</option>
        </select>
      </div>
      <div>
        <Cards value={securityQuestionValue} />
      </div>
    </div>
  );
}

export default Home;
