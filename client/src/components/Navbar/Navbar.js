import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/" className='nav-items'>
            Home
        </Link>
        <Link to="/" className='nav-items'>
            About
        </Link>
        <Link to="/login" className='nav-items'>
            Login
        </Link>
    </div>
  )
}

export default Navbar