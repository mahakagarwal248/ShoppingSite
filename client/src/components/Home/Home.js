import React, { useState } from 'react';
import Cards from './Card/Cards';
import './Home.css';

function Home() {
  const [securityQuestionValue, setSecurityQuestionValue] = useState('all');

  return (
    <div className="home-container">
      <h2>
        Welcome to your <i>Shopping Site</i>
      </h2>
      <div>
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
