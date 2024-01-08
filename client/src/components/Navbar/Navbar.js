import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './Navbar.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  }, []);

  var User = JSON.parse(localStorage.getItem('Profile'));

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
  }, []);

  return (
    <div className="navbar">
      <Link to="/" className="nav-items">
        Home
      </Link>
      <Link to="/about" className="nav-items">
        About
      </Link>
      {localStorage.getItem('Profile') === null ? (
        <Link to="/login" className="nav-items">
          Login
        </Link>
      ) : (
        <div className="user-nav-icons">
          {User.result.role === 'merchant' && (
            <Link to="/dashboard" className="nav-items-right">
              Dashboard
            </Link>
          )}
          {/* <Link to="/cart" className="nav-items-right">
            <ShoppingCartOutlinedIcon className="nav-icons" />
          </Link>
          <Link to="/wishlist" className="nav-items-right">
            <FavoriteBorderOutlinedIcon className="nav-icons" />
          </Link>
          <Link className="nav-items-right" to="/about" style={{ textDecoration: 'none' }}>
            <Avatar className="user-avatar">{User?.result?.name.charAt(0).toUpperCase()}</Avatar>
          </Link>
          <p className="nav-items-right">
            Hi,{' '}
            {User.result?.name.split(' ')[0].charAt(0).toUpperCase() +
              User.result?.name.split(' ')[0].slice(1)}
          </p> */}
          <NavDropdown
            title={
              <Avatar
                className="user-avatar"
                style={{ display: 'inline-flex', marginRight: '5px' }}>
                {User?.result?.name.charAt(0).toUpperCase()}
              </Avatar>
            }
            style={{
              '--bs-nav-link-color': 'black',
              '--bs-nav-link-hover-color': 'black',
              '--bs-nav-link-disabled-color': 'black'
            }}
            id="basic-nav-dropdown">
            <NavDropdown.Item to="/about" as={Link}>
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Item to="/orders" as={Link}>
              My Orders
            </NavDropdown.Item>
            <NavDropdown.Item to="/cart" as={Link}>
              My Cart
            </NavDropdown.Item>
            <NavDropdown.Item to="/wishlist" as={Link}>
              My Wishlist
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
          {/* <button type="button" className="logout-btn nav-items" onClick={handleLogout}>
            Logout
          </button> */}
        </div>
      )}
    </div>
  );
}

export default Navbar;
