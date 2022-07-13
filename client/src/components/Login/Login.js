import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import './Login.css';
import Navbar from '../Navbar/Navbar'
import {login} from '../../actions/Users';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password){
      alert('Invalid credentials')
    }
    dispatch(login({email, password}, navigate))
  }

  return (
    <div className='login-container'>
      <Navbar/>
        <h1>Welcome to the <i>Shopping Site</i></h1>
        <div style={{marginTop:'25px'}}>
          <Link to="/register">
            Sign up
          </Link>
          <p>or</p>
          <form className='login-form' onSubmit={handleSubmit}>
            <label>Email</label><br/>
            <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label><br/>
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <button type='submit' className='login-form-btn'>Login</button>
          </form>
        </div>
    </div>
  )
}

export default Login