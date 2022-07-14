import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import './Navbar.css';

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({type:'LOGOUT'});
    navigate('/');
  }

  var User = JSON.parse(localStorage.getItem('Profile'))

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
          <div style={{marginLeft:'auto', display:'flex'}}>
            <Link to="/cart">
              <ShoppingCartOutlinedIcon className='nav-icons'/>
            </Link>
            <Link to="/wishlist">
              <FavoriteBorderOutlinedIcon className='nav-icons'/>
            </Link>
            <Avatar style={{height:'34px', width:'34px',color:'black'}}>{User.result.name.charAt(0).toUpperCase()}</Avatar>
            <p style={{margin:'auto 70px auto 10px', fontSize:'22px'}}>Hi, {User.result.name.split(" ").slice(0, -1).join(' ')}</p>
            <button type='button' className='logout-btn' onClick={handleLogout}>Logout</button>
          </div>
        }
        
    </div>
  )
}

export default Navbar