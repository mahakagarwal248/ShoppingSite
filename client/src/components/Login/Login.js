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
      <div style={{marginTop:'80px'}}>
      <h2>Login Here</h2>
        <div style={{marginTop:'25px'}}>
          <form className='login-form' onSubmit={handleSubmit}>
            <label>Email</label><br/>
            <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label><br/>
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <button type='submit' className='login-form-btn'>Login</button>
            <div>
              <span>New User?</span>
              <Link to="/register">
                <button className='signup-btn'>Sign up</button>
              </Link>
              <span>now.</span>
            </div>
          </form>
        </div>
      </div>
        
    </div>
  )
}

export default Login