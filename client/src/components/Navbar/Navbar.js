import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Navbar.css';

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({type:'LOGOUT'});
    navigate('/');
  }
  return (
    <div className='navbar'>
        <Link to="/" className='nav-items'>
            Home
        </Link>
        <Link to="/" className='nav-items'>
            About
        </Link>
        {localStorage.getItem('Profile') === null ? 
          <Link to="/login" className='nav-items'>
              Login
          </Link>
          :
          <>
            <button type='button' className='logout-btn' onClick={handleLogout}>Logout</button>
          </>
        }
        
    </div>
  )
}

export default Navbar