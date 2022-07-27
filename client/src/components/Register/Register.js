import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import './Register.css';
import { signup } from '../../actions/Users';
import Navbar from '../Navbar/Navbar';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [securityAns, setSecurityAns] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Email is required');
    }
    if (!name) {
      alert('Enter a name to continue');
    }
    dispatch(signup({ name, email, password, mobile, address, securityAns }, navigate));
  };
  return (
    <div className="register-container container">
      <Navbar />
      <br />
      <h2>Register Here</h2>
      <br />
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <br />
        <input type="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email</label>
        <br />
        <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password</label>
        <br />
        <input
          type={showPw ? 'text' : 'password'}
          minLength="6"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <RemoveRedEyeIcon onClick={() => setShowPw(!showPw)} style={{ marginLeft: '2px' }} />
        <br />
        <label>Mobile</label>
        <br />
        <input
          type="tel"
          placeholder="Enter mobile number"
          onChange={(e) => setMobile(e.target.value)}
        />
        <br />
        <label>Address</label>
        <br />
        <input
          type="text"
          placeholder="Enter address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <label>Security Question</label>
        <br />
        <span>What is the name of street that you live in?</span>
        <input
          type="text"
          placeholder="Enter address"
          onChange={(e) => setSecurityAns(e.target.value)}
        />
        <br />
        <button type="submit" className="register-form-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
