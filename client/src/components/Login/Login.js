import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import buffer from 'buffer';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import './Login.css';
import { login } from '../../actions/Users';
import { setModalStep, showModal } from '../../actions/Common';
import { addCookie } from '../../helpers/Cookies';
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(setModalStep(2));
    dispatch(showModal(true));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert('Invalid credentials');
    }
    const data = { email, password };
    const loginData = JSON.stringify(data);
    const encodedText = buffer.Buffer.from(loginData).toString('base64');
    const redirectionPath = location.state?.from?.pathname || '/';
    const response = await dispatch(login(encodedText)).then((res) => {
      return res;
    });
    addCookie('auth', true);
    addCookie('role', response?.result?.role);
    navigate(redirectionPath);
  };

  return (
    <div className="login-container container">
      <div className="login-container-div">
        <h2>Login</h2>
        <div>
          <form className="login-form">
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type={showPw ? 'text' : 'password'}
              minLength="6"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <RemoveRedEyeIcon onClick={() => setShowPw(!showPw)} className="eye-icon" />
            <br />
            <button onClick={handleSubmit} className="login-form-btn">
              Login
            </button>
            <br />
            <button className="forgot-password-btn" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
            <div style={{ color: 'black', marginTop: 0 }}>
              <span>New User?</span>
              <Link to="/register">
                <button className="signup-btn">Sign up</button>
              </Link>
              <span>now.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
