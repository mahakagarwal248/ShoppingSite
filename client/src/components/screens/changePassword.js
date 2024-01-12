import './index.css';
import ModalComp from '../general/Modal';
import { useDispatch } from 'react-redux';
import { setModalStep, showModal } from '../../actions/Common';
import { updatePassword } from '../../actions/Users';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ChangePassword() {
  var User = JSON.parse(localStorage.getItem('Profile'));

  const emailData = localStorage.getItem('email');
  const currentEmail = JSON.parse(emailData);

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isMatched, setIsMatched] = useState(true);

  const handleConfirmPassword = (e) => {
    if (e.target.value === newPassword) {
      setConfirmPassword(e.target.value);
      setIsMatched(true);
      return;
    } else {
      return setIsMatched(false);
    }
  };
  const handleSubmit = (e) => {
    if (newPassword !== confirmPassword) return setIsMatched(false);
    if (oldPassword === '') return toast.error('Please enter your existing password');
    if (newPassword === '') return toast.error('Please enter a valid new password');

    const updatePasswordObj = {
      oldPassword,
      newPassword,
      email: User?.result?.email || currentEmail?.email
    };
    e.preventDefault();
    dispatch(updatePassword(updatePasswordObj));
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
          <h3>Change Password</h3>
          <input
            type="text"
            placeholder="Enter Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Enter New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <input type="text" placeholder="Confirm New Password" onChange={handleConfirmPassword} />
          <br />
          {!isMatched ? (
            <>
              <span>The password does not match</span>
              <br />
            </>
          ) : (
            <></>
          )}

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

export default ChangePassword;
