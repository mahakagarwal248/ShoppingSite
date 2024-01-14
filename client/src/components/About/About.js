import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import buffer from 'buffer';

import './About.css';
import { postProfilePic } from '../../actions/Users';
import { setModalStep, showModal } from '../../actions/Common';
import { CameraAlt } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { getCookie } from '../../helpers/Cookies';

function About() {
  const auth = getCookie('auth');
  const dispatch = useDispatch();

  const [User, setUser] = useState({});

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('Profile'));
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const userId = User?.result?._id;
  const currentProfile = User?.result;
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  const handleFile = async (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    const response = await dispatch(postProfilePic(userId, fileData)).then((res) => res);
    if (response.status === 200) getUser();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(setModalStep(2));
    dispatch(showModal(true));
  };
  return (
    <div className="about-container container">
      {!auth ? (
        <>
          <h2>You Need to login first</h2>
          <Link to="/login">
            <button className="about-login-btn">Login</button>
          </Link>
        </>
      ) : (
        <>
          <div className="about-container-div">
            <div className="about-container-div1">
              <div className="about-container-div2">
                <div className="profile-photo-div">
                  {currentProfile?.profilePicture ? (
                    <img
                      src={`data:${
                        currentProfile.profilePicture.contentType
                      };base64, ${buffer.Buffer.from(currentProfile.profilePicture.data).toString(
                        'base64'
                      )}`}
                      alt="profile"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        background: 'lightgrey',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Tooltip title="Upload Photo">
                        <CameraAlt
                          htmlFor="fileInput"
                          onClick={triggerFileInput}
                          style={{ fontSize: '44px', color: 'black', cursor: 'pointer' }}
                        />
                      </Tooltip>
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFile}
                      />
                    </div>
                  )}
                </div>
                <h2>User Details</h2>
              </div>
            </div>
            <hr style={{ margin: 0 }} />
            <div className="info-div">
              <p className="name-p">
                <strong>Name : </strong>
                {User.result?.name.split(' ')[0].charAt(0).toUpperCase() +
                  User.result?.name.split(' ')[0].slice(1) +
                  (User.result?.name.split(' ')[1]
                    ? ' ' +
                      User.result?.name.split(' ')[1]?.charAt(0)?.toUpperCase() +
                      User.result?.name.split(' ')[1]?.slice(1)
                    : '')}
              </p>
            </div>
            <div className="info-div">
              <p className="name-p">
                <strong>Address : </strong>
                {User.result?.address}
              </p>
            </div>
            <div className="info-div" style={{ display: 'flex', flexDirection: 'row' }}>
              <div
                style={{
                  paddingRight: '10px',
                  width: '100%',
                  borderRight: '1px solid grey'
                }}>
                <p className="name-p">
                  <strong>Email : </strong>
                  {User?.result?.email}
                </p>
              </div>
              <div
                style={{
                  paddingLeft: '10px',
                  width: '100%',
                  borderLeft: '1px solid grey'
                }}>
                <p className="name-p">
                  <strong>Mobile : </strong>
                  {User?.result?.mobile}
                </p>
              </div>
            </div>
            <div className="info-div">
              <button className="change-password-btn" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default About;
