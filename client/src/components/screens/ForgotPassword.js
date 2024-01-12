import './index.css';
import ModalComp from '../general/Modal';
import { useDispatch } from 'react-redux';
import { setModalStep, showModal } from '../../actions/Common';
import { sendOtp } from '../../actions/Users';
import { useState } from 'react';
import { toast } from 'react-toastify';
function ForgotPassword() {
  const emailData = localStorage.getItem('email');
  const currentEmail = emailData ? JSON.parse(emailData) : '';

  const dispatch = useDispatch();

  const [email, setEmail] = useState(currentEmail.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '') return toast.error('Please enter a valid email');
    if (!email.includes('@')) return toast.error('Please enter a valid email');
    if (!email.includes('.')) return toast.error('Please enter a valid email');
    dispatch(sendOtp(email));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(showModal(false));
    dispatch(setModalStep(0));
    localStorage.removeItem('email');
  };
  return (
    <div>
      <ModalComp>
        <div className="change-password-screen-div">
          <h3>Verify your email</h3>
          <input
            type="email"
            placeholder="Enter Email"
            value={email ? email : ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <button className="change-password-screen-btn1" onClick={handleSubmit}>
            Submit
          </button>
          <button className="change-password-screen-btn2" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </ModalComp>
    </div>
  );
}

export default ForgotPassword;
