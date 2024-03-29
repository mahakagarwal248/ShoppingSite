import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

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
import ChangePassword from './components/screens/changePassword';
import ForgotPassword from './components/screens/ForgotPassword';
import VerifyOtp from './components/screens/VerifyOtp';
import ProtectedRoutes from './components/general/ProtectedRoutes';
import ContactUs from './dashboard/screens/ContactUs';

function NavbarWrapper() {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return isDashboardPage ? null : <Navbar />;
}

function App() {
  const blankStep = <></>;
  const steps = {
    0: blankStep,
    1: EditProducts,
    2: ForgotPassword,
    3: VerifyOtp,
    4: ChangePassword,
    5: ContactUs
  };

  const currentStep = useSelector((state) => state.setModalStepReducer.data);
  const Component = steps[currentStep];

  return (
    <BrowserRouter>
      {currentStep !== 0 ? <Component /> : ''}
      <NavbarWrapper />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="App">
              <Home />
              <Footer />
            </div>
          }
        />
        <Route exact path="/about" element={<ProtectedRoutes component={About} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/cart" element={<ProtectedRoutes component={Cart} />} />
        <Route exact path="/wishlist" element={<ProtectedRoutes component={Wishlist} />} />
        <Route exact path="/orders" element={<ProtectedRoutes component={Orders} />} />
        <Route exact path="/productDetails/:id" element={<ProductDetails />} />
        <Route exact path="/dashboard" element={<ProtectedRoutes component={Dashboard} />} />
        <Route
          exact
          path="/dashboard/products"
          element={<ProtectedRoutes component={Products} />}
        />
        <Route
          exact
          path="/dashboard/add-product"
          element={<ProtectedRoutes component={AddProduct} />}
        />
        <Route exact path="/dashboard/profile" element={<ProtectedRoutes component={Profile} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
