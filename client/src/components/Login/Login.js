import React from 'react';
import './Login.css'

function Login() {
  return (
    <div className='login-container'>
        <h1>Welcome to the <i>Shopping Site</i></h1>
        <div style={{marginTop:'25px'}}>
          <button>Sign up</button>
          <p>or</p>
          <form className='login-form'>
            <label>Email</label><br/>
            <input type="email" placeholder="Enter email"/>
            <br/>
            <label>Password</label><br/>
            <input type="password" placeholder="Enter your password"/>
            <br/>
            <button type='submit' className='login-form-btn'>Login</button>
          </form>
        </div>
    </div>
  )
}

export default Login