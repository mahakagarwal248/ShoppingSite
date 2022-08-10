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
  // const API = axios.create({ baseURL: 'http://localhost:5000' });
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
          <h2 style={{ marginTop: '25px' }}>You Need to login first</h2>
          <Link to="/login">
            <button className="about-login-btn">Login</button>
          </Link>
        </>
      ) : (
        <>
          <div style={{ marginTop: '25px' }}>
            <h2>User Details</h2>
            <div style={{ width: '50%', margin: 'auto', marginTop: '45px', display: 'flex' }}>
              <div>
                {userProfileImage === {} ? (
                  <>
                    <div>
                      <form encType="multipart/form-data" style={{ display: 'flex' }}>
                        <h4>Upload Profile Pic:</h4>
                        <input
                          type="file"
                          name="file"
                          onChange={handleFile}
                          style={{ marginLeft: '8px' }}
                        />
                        <button type="submit">Go</button>
                      </form>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <br />
                <div style={{ display: 'flex' }}>
                  <h4>Name:</h4>
                  <span style={{ fontSize: '20px', marginLeft: '8px' }}>{User?.result?.name}</span>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                  <h4>Email:</h4>
                  <span style={{ fontSize: '20px', marginLeft: '8px' }}>{User?.result?.email}</span>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                  <h4>Mobile:</h4>
                  <span style={{ fontSize: '20px', marginLeft: '8px' }}>
                    {User?.result?.mobile}
                  </span>
                </div>
                <br />
                <div style={{ display: 'flex' }}>
                  <h4>Address:</h4>
                  <span style={{ fontSize: '20px', marginLeft: '8px' }}>
                    {User?.result?.address}
                  </span>
                </div>
              </div>
              {userProfileImage !== {} ? (
                <>
                  <div style={{ marginLeft: 'auto', marginTop: '25px' }}>
                    <img
                      src={userProfileImage}
                      alt="profile"
                      style={{ width: '90px', height: '90px' }}
                    />
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
