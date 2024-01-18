import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import buffer from 'buffer';
import Avatar from '@mui/material/Avatar';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './Navbar.css';
import { getCookie, removeCookie } from '../../helpers/Cookies';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    removeCookie('auth');
    removeCookie('role');
    navigate('/');
  }, []);

  var User = JSON.parse(localStorage.getItem('Profile'));
  const auth = getCookie('auth');
  const role = getCookie('role');

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
      {!auth ? (
        <Link to="/login" className="nav-items">
          Login
        </Link>
      ) : (
        <div className="user-nav-icons">
          {auth && role === 'merchant' && (
            <Link to="/dashboard" className="nav-items-right">
              Dashboard
            </Link>
          )}
          <NavDropdown
            title={
              <Avatar
                className="user-avatar"
                style={{ display: '-webkit-inline-box', marginRight: '5px' }}>
                {User?.result?.profilePicture ? (
                  <img
                    src={`data:${
                      User?.result?.profilePicture.contentType
                    };base64, ${buffer.Buffer.from(User?.result?.profilePicture.data).toString(
                      'base64'
                    )}`}
                    alt="profile"
                    style={{ height: '36px', width: '36px' }}
                  />
                ) : (
                  User?.result?.name.charAt(0).toUpperCase()
                )}
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
        </div>
      )}
    </div>
  );
}

export default Navbar;
