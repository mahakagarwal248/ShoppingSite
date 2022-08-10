import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import ProductDetails from './components/ProductDetails/ProductDetails';
import About from './components/About/About';

import { fetchAllProducts } from './actions/Products';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  var User = JSON.parse(localStorage.getItem('Profile'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="App container">
              <Navbar />
              <Home />
              <Footer />
            </div>
          }
        />
        <Route exact path="/about" element={<About />} />
        <Route
          exact
          path="/login"
          element={User === null ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          exact
          path="/register"
          element={User === null ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          exact
          path="/cart"
          element={User !== null ? <Cart /> : <Navigate to="/" replace />}
        />
        <Route
          exact
          path="/wishlist"
          element={User !== null ? <Wishlist /> : <Navigate to="/" replace />}
        />
        <Route exact path="/productDetails/:id" element={<ProductDetails />} />
        {/* <Route exact path="*" element={
          <div className="App container">
          <Navbar/>
          <Home/>
          <Footer/>
        </div>
        && <Navigate to="/" replace/>
        }/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
