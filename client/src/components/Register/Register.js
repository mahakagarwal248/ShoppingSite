import React from "react";
import "./Register.css";

function Register() {
  return (
    <div className="register-container">
      <form className="register-form">
        <label>Name</label>
        <br />
        <input type="name" placeholder="Enter name" />
        <br />
        <label>Email</label>
        <br />
        <input type="email" placeholder="Enter email" />
        <br />
        <label>Password</label>
        <br />
        <input type="password" placeholder="Enter your password" />
        <br />
        <label>Mobile</label>
        <br />
        <input type="tel" placeholder="Enter mobile number" />
        <br />
        <label>Address</label>
        <br />
        <input type="text" placeholder="Enter address" />
        <br />
        <button type="submit" className="register-form-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
