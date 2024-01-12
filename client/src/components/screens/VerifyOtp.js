import './index.css';
import ModalComp from '../general/Modal';
import { useDispatch } from 'react-redux';
import { setModalStep } from '../../actions/Common';
import { verifyOtp } from '../../actions/Users';
import { useState } from 'react';

// import { toast } from 'react-toastify';
function VerifyOtp() {
  const emailData = localStorage.getItem('email');
  const currentEmail = JSON.parse(emailData);
  const dispatch = useDispatch();

  const [otp, setOtp] = useState({
    firstNum: '',
    secondNum: '',
    thirdNum: '',
    forthNum: ''
  });

  const prevInputHandler = (event) => {
    setTimeout(() => {
      if (event.code === 'Backspace' && event.target.value === '' && event.target.previousSibling) {
        event.target.previousSibling.focus();
      }
      if (event.code === 'ArrowRight' && event.target.nextSibling) {
        event.target.nextSibling.focus();
      }
      if (event.code === 'ArrowLeft' && event.target.previousSibling) {
        event.target.previousSibling.focus();
      }
      if (event.target.value !== '' && event.target.nextSibling) {
        console.log('coming here');
        event.target.nextSibling.focus();
      }
    }, 10);
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData('Text');
    const otpArray = pastedData.split('').slice(0, 4);

    setOtp({
      firstNum: otpArray[0] || '',
      secondNum: otpArray[1] || '',
      thirdNum: otpArray[2] || '',
      forthNum: otpArray[3] || ''
    });

    setTimeout(() => {
      event.target.nextSibling.nextSibling.nextSibling.focus();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.firstNum + otp.secondNum + otp.thirdNum + otp.forthNum;
    const otpData = {
      email: currentEmail.email,
      otp: otpString
    };
    dispatch(verifyOtp(otpData));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // dispatch(showModal(false));
    dispatch(setModalStep(2));
  };
  return (
    <div>
      <ModalComp>
        <div className="change-password-screen-div">
          <h3>Enter the otp</h3>
          <div className="otp-div">
            <input
              id="input1"
              type="text"
              className="otp-input"
              maxLength="1"
              onPaste={handlePaste}
              onKeyDown={(event) => prevInputHandler(event)}
              value={otp.firstNum}
              onChange={(e) => {
                setOtp({ ...otp, firstNum: e.target.value });
              }}
            />
            <input
              type="text"
              className="otp-input"
              maxLength="1"
              onPaste={handlePaste}
              onKeyDown={(event) => prevInputHandler(event)}
              value={otp.secondNum}
              onChange={(e) => {
                setOtp({ ...otp, secondNum: e.target.value });
              }}
            />
            <input
              type="text"
              className="otp-input"
              maxLength="1"
              onPaste={handlePaste}
              onKeyDown={(event) => prevInputHandler(event)}
              value={otp.thirdNum}
              onChange={(e) => {
                setOtp({ ...otp, thirdNum: e.target.value });
              }}
            />
            <input
              type="text"
              className="otp-input"
              maxLength="1"
              onPaste={handlePaste}
              onKeyDown={(event) => prevInputHandler(event)}
              value={otp.forthNum}
              ref={(input) => input && input.focus()}
              onChange={(e) => {
                setOtp({ ...otp, forthNum: e.target.value });
              }}
            />
          </div>
          <button className="change-password-screen-btn1" onClick={handleSubmit}>
            Submit
          </button>
          <button className="change-password-screen-btn2" onClick={handleCancel}>
            Change Email
          </button>
        </div>
      </ModalComp>
    </div>
  );
}

export default VerifyOtp;
