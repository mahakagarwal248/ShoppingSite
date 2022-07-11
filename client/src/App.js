import './App.css';
import {BrowserRouter, Routes , Route } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
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
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
