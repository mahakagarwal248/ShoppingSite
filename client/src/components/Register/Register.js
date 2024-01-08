import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import './Register.css';
import { signup } from '../../actions/Users';

const securityQuestions = [
  {
    quesNo: '1',
    value: 'What is the name of street that you live in?',
    question: 'What is the name of street that you live in?'
  },
  {
    quesNo: '2',
    value: 'What is the name of your pet?',
    question: 'What is the name of your pet?'
  },
  {
    quesNo: '3',
    value: 'What is the name of your first school?',
    question: 'What is the name of your first school?'
  },
  {
    quesNo: '4',
    value: 'Which is your favorite color?',
    question: 'Which is your favorite color?'
  }
];
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
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
  const handleRoleInput = (e) => {
    setRole(e.target.value);
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
      signup({ name, email, password, mobile, address, securityQues, securityAns, role }, navigate)
    );
  };
  return (
    <div className="register-container container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="name" placeholder="Enter name" onChange={handleNameInput} />
        <br />
        <input type="email" placeholder="Enter email" onChange={handleEmailInput} />
        <br />
        <input
          type={showPw ? 'text' : 'password'}
          minLength="6"
          placeholder="Enter your password"
          onChange={handlePasswordInput}
        />
        <RemoveRedEyeIcon onClick={handleShowPw} className="eye-icon" />
        <br />
        <input type="tel" placeholder="Enter Mobile Number" onChange={handleMobileInput} />
        <br />
        <input type="text" placeholder="Enter Address" onChange={handleAddressInput} />
        <br />
        <select value={role} onChange={handleRoleInput}>
          <option value="" disabled>
            Select Role
          </option>
          <option value="customer">Customer</option>
          <option value="merchant">Merchant</option>
        </select>
        <br />
        {/* <label>Security Question</label>
        <br /> */}
        <select value={securityQues} onChange={handleSecurityQuestionInput}>
          <option value="" disabled>
            Select Security Question
          </option>
          {securityQuestions.map((questions) => (
            <option key={questions.quesNo} value={questions.value}>
              {questions.question}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="Enter Security Answer"
          onChange={handleSecurityAnswerInput}
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
