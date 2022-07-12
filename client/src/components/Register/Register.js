import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div className="register-container">
      <form className="register-form">
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
