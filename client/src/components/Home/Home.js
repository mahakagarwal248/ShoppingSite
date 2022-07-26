import React, { useState } from 'react';
import Cards from './Card/Cards';
import './Home.css';

function Home() {
  const [value, setValue] = useState('all');

  return (
    <div className="home-container">
      <h2>
        Welcome to your <i>Shopping Site</i>
      </h2>
      <div>
        <p style={{ fontSize: '18px' }}>Search By Category</p>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ height: '28px', marginLeft: '8px' }}>
          <option value="" hidden>
            Select Category
          </option>
          <option value="all">All</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="mobile & accessories">Mobile & accessories</option>
        </select>
      </div>
      <div>
        <Cards value={value} />
      </div>
    </div>
  );
}

export default Home;
