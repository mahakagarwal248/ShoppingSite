import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import buffer from 'buffer';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './Login.css';
import Navbar from '../Navbar/Navbar';
import { forgotPassword, getSecurityQuestion, login, updatedPassword } from '../../actions/Users';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ans, setAns] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const [open, setOpen] = useState(false);
  const securityData = useSelector((state) => state.userReducer);

  const handleOpen = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Enter Email First');
    } else {
      setOpen(true);
      dispatch(getSecurityQuestion(email));
    }
  };
  const handleClose = () => setOpen(false);

  const [editPW, setEditPw] = useState(false);
  const [newPW, setNewPW] = useState('');

  const handleModalSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email, ans }, setEditPw));
  };

  const handlePWSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedPassword({ email, newPW }));
    setOpen(false);
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert('Invalid credentials');
    }
    const data = { email, password };
    const loginData = JSON.stringify(data);
    const encodedText = buffer.Buffer.from(loginData).toString('base64');
    dispatch(login(encodedText, navigate));
  };

  const handleNewPW = (e) => {
    setNewPW(e.target.value);
  };

  const handleSecurityAnswerInput = (e) => {
    setAns(e.target.value);
  };

  return (
    <div className="login-container container">
      <Navbar />
      <div className="login-container-div">
        <h2>Login Here</h2>
        <div>
          <form className="login-form">
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label>
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
            <button className="forgot-password-btn" onClick={handleOpen}>
              Forgot Password?
            </button>
            <div style={{ color: 'var(--secondary-color-light)' }}>
              <span>New User?</span>
              <Link to="/register">
                <button className="signup-btn">Sign up</button>
              </Link>
              <span>now.</span>
            </div>
          </form>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="password-change-modal-box">
          {editPW ? (
            <>
              <div>
                <h5>Change Password</h5>
                <button onClick={handleClose} className="cross-btn">
                  X
                </button>
              </div>
              <p>Enter new password</p>
              <input onChange={handleNewPW} type="text" placeholder="Enter password" />
              <button className="submit-btn" onClick={handlePWSubmit}>
                Submit
              </button>
            </>
          ) : (
            <>
              <div>
                <h5>Security Question</h5>
                <button onClick={handleClose} className="cross-btn">
                  X
                </button>
              </div>
              <p>{securityData?.data?.data}</p>
              <input
                onChange={handleSecurityAnswerInput}
                type="text"
                placeholder="Enter security answer here"
              />
              <button className="submit-btn" onClick={handleModalSubmit}>
                Submit
              </button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Login;
