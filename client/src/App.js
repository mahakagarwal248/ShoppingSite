import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import ProductDetails from './components/ProductDetails/ProductDetails';
import About from './components/About/About';

import Dashboard from './dashboard';
import Products from './dashboard/pages/Products';
import AddProduct from './dashboard/pages/AddProduct';
import Profile from './dashboard/pages/Profile';
import Orders from './components/Orders/Orders';
import EditProducts from './dashboard/screens/EditProducts';
import { useSelector } from 'react-redux';

function App() {
  const blankStep = <></>;
  const steps = {
    0: blankStep,
    1: EditProducts
  };

  const currentStep = useSelector((state) => state.setModalStepReducer.data);
  const Component = steps[currentStep];

  var User = JSON.parse(localStorage.getItem('Profile'));
  return (
    <BrowserRouter>
      {currentStep !== 0 ? <Component /> : ''}
      {User?.result?.role === 'merchant' ? <></> : <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="App">
              {User?.result?.role === 'merchant' ? <Navbar /> : <></>}
              <Home />
              <Footer />
            </div>
          }
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/productDetails/:id" element={<ProductDetails />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/products" element={<Products />} />
        <Route exact path="/dashboard/add-product" element={<AddProduct />} />
        <Route exact path="/dashboard/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
