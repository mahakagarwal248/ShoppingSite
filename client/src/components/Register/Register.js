import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import "./Register.css";
import {signup} from '../../actions/Users'
import Navbar from "../Navbar/Navbar";

function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      if(!email){
        alert('Email is neccessary')
      }
      if(!name){
        alert("Enter a name to continue")
      }
      dispatch(signup({name, email, password, mobile, address}, navigate))
  }
  return (
    <div className="register-container">
      <Navbar/>
      <br/>
      <h2>Register Here</h2>
      <br/>
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
        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label>Mobile</label>
        <br />
        <input type="tel" placeholder="Enter mobile number" onChange={(e) => setMobile(e.target.value)} />
        <br />
        <label>Address</label>
        <br />
        <input type="text" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} />
        <br />
        <button type="submit" className="register-form-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
