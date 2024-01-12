import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import buffer from 'buffer';

import './About.css';
import { postProfilePic } from '../../actions/Images';
import { setModalStep, showModal } from '../../actions/Common';

function About() {
  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User?.result?._id;
  const currentProfile = User?.result;
  const dispatch = useDispatch();

  const handleFile = (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    dispatch(postProfilePic(userId, fileData));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(setModalStep(2));
    dispatch(showModal(true));
  };
  return (
    <div className="about-container container">
      {User === null ? (
        <>
          <h2 style={{}}>You Need to login first</h2>
          <Link to="/login">
            <button className="about-login-btn">Login</button>
          </Link>
        </>
      ) : (
        <>
          <div>
            <h2>User Details</h2>
            <div className="about-container-div">
              <div>
                {currentProfile === undefined ? (
                  ''
                ) : !currentProfile.profilePicture ? (
                  <>
                    <div>
                      <form encType="multipart/form-data">
                        <h4>Upload Profile Pic:</h4>
                        <input
                          type="file"
                          name="file"
                          onChange={handleFile}
                          className="about-file-input"
                        />
                        <button type="submit">Go</button>
                      </form>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <br />
                <div className="display-info-container">
                  <h4>Name:</h4>
                  <span>
                    {User.result?.name.split(' ')[0].charAt(0).toUpperCase() +
                      User.result?.name.split(' ')[0].slice(1) +
                      (User.result?.name.split(' ')[1]
                        ? ' ' +
                          User.result?.name.split(' ')[1]?.charAt(0)?.toUpperCase() +
                          User.result?.name.split(' ')[1]?.slice(1)
                        : '')}
                  </span>
                </div>
                <br />
                <div className="display-info-container">
                  <h4>Email:</h4>
                  <span>{User?.result?.email}</span>
                </div>
                <br />
                <div className="display-info-container">
                  <h4>Mobile:</h4>
                  <span>{User?.result?.mobile}</span>
                </div>
                <br />
                <div className="display-info-container">
                  <h4>Address:</h4>
                  <span>{User?.result?.address}</span>
                </div>
              </div>
              {currentProfile === undefined ? (
                ''
              ) : currentProfile.profilePicture ? (
                <>
                  <div className="display-profile-image-container">
                    <img
                      src={`data:${
                        currentProfile.profilePicture.contentType
                      };base64, ${buffer.Buffer.from(currentProfile.profilePicture.data).toString(
                        'base64'
                      )}`}
                      alt="profile"
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="change-password-btn">
            <button onClick={handleChangePassword}>Change Password</button>
          </div>
        </>
      )}
    </div>
  );
}

export default About;
