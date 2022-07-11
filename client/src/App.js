import './App.css';
import {BrowserRouter, Routes , Route } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <div className="App">
          <Navbar/>
          <Footer/>
        </div>
        }/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
