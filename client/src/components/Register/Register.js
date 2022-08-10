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

  const [securityQues, setSecurityQues] = useState('');

  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleShowPw = () => {
    setShowPw(!showPw);
  };
  const handleMobileInput = (e) => {
    setMobile(e.target.value);
  };
  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };
  const handleSecurityQuestionInput = (e) => {
    setSecurityQues(e.target.value);
  };
  const handleSecurityAnswerInput = (e) => {
    setSecurityAns(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Email is required');
    }
    if (!name) {
      alert('Enter a name to continue');
    }
    dispatch(
      signup({ name, email, password, mobile, address, securityQues, securityAns }, navigate)
    );
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
        <input type="name" placeholder="Enter name" onChange={handleNameInput} />
        <br />
        <label>Email</label>
        <br />
        <input type="email" placeholder="Enter email" onChange={handleEmailInput} />
        <br />
        <label>Password</label>
        <br />
        <input
          type={showPw ? 'text' : 'password'}
          minLength="6"
          placeholder="Enter your password"
          onChange={handlePasswordInput}
        />
        <RemoveRedEyeIcon onClick={handleShowPw} style={{ marginLeft: '2px' }} />
        <br />
        <label>Mobile</label>
        <br />
        <input type="tel" placeholder="Enter mobile number" onChange={handleMobileInput} />
        <br />
        <label>Address</label>
        <br />
        <input type="text" placeholder="Enter address" onChange={handleAddressInput} />
        <br />
        <label>Security Question</label>
        <br />
        <select value={securityQues} onChange={handleSecurityQuestionInput}>
          <option value="What is the name of street that you live in?">
            What is the name of street that you live in?
          </option>
          <option value="What is the name of your pet?">What is the name of your pet?</option>
          <option value="What is the name of your first school?">
            What is the name of your first school?
          </option>
          <option value="Which is your favorite color?">Which is your favorite color?</option>
        </select>
        <br />
        <br />
        <input type="text" placeholder="Enter answer" onChange={handleSecurityAnswerInput} />
        <br />
        <button type="submit" className="register-form-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
