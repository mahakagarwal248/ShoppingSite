import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom'

function Navbar() {

  if(localStorage.getItem('Profile') === null){

  }
  return (
    <div className='navbar'>
        <Link to="/" className='nav-items'>
            Home
        </Link>
        <Link to="/" className='nav-items'>
            About
        </Link>
        <Link to="/login" className='nav-items'>
            {localStorage.getItem('Profile') === null ? "Login" : "Logout"}
        </Link>
    </div>
  )
}

export default Navbar