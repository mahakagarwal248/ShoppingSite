import { useEffect } from 'react';
import './App.css';
import {BrowserRouter, Routes , Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { fetchAllProducts } from './actions/Products';

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
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
