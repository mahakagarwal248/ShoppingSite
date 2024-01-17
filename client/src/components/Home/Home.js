import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from './Card/Cards';
import './Home.css';
import { fetchAllProducts } from '../../actions/Products';
import PaginationComp from '../general/Pagination';
import { PRODUCT_LIMIT } from '../../Constants';

function Home() {
  const [category, setCategory] = useState('all');

  const dispatch = useDispatch();
  const fetchProducts = () => {
    dispatch(fetchAllProducts({ page: 1, limit: PRODUCT_LIMIT }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productCount = useSelector((state) => state?.productReducer?.data?.productCount);

  const handlePageChange = (page) => {
    dispatch(fetchAllProducts({ page: page, limit: PRODUCT_LIMIT }));
  };

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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
        <Cards category={category} />
      </div>
      {productCount && (
        <div>
          <PaginationComp count={productCount} handlePageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}

export default Home;
