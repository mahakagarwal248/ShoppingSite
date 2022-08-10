import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import buffer from 'buffer';

import './About.css';
import Navbar from '../Navbar/Navbar';
import { postProfilePic } from '../../actions/Images';

function About() {
  var User = JSON.parse(localStorage.getItem('Profile'));
  const userId = User?.result?._id;
  const dispatch = useDispatch();
  const [userProfileImage, setUserProfileImage] = useState({});

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:5000/images/getImage/${userId}`
    }).then(function (response) {
      let user = response.data;
      if (user === null) {
        setUserProfileImage({});
      } else {
        setUserProfileImage(
          `data:${user.img.contentType};base64, ${buffer.Buffer.from(user.img.data).toString(
            'base64'
          )}`
        );
      }
    });
  }, []);

  const handleFile = (e) => {
    e.preventDefault();

    const fileData = new FormData();
    fileData.append('file', e.target.files[0]);
    dispatch(postProfilePic(userId, fileData));
  };

  return (
    <div className="about-container container">
      <Navbar />
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
                {userProfileImage === {} ? (
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
                  <span>{User?.result?.name}</span>
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
                  <span s>{User?.result?.address}</span>
                </div>
              </div>
              {userProfileImage !== {} ? (
                <>
                  <div className="display-profile-image-container">
                    <img src={userProfileImage} alt="profile" />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default About;
