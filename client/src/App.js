import { useEffect } from 'react';
import './App.css';
import {BrowserRouter, Routes , Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart'
import { fetchAllProducts } from './actions/Products';
import Wishlist from './components/Wishlist/Wishlist';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllProducts());
  },[dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <div className="App">
          <Navbar/>
          <Home/>
          <Footer/>
        </div>
        }/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/wishlist" element={<Wishlist/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
