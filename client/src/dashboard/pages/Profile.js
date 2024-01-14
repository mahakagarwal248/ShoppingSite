import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import { addProfile, deleteProfile, getProfileById } from '../../actions/BusinessProfile';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem('Profile'));
  const merchantId = User?.result?._id;

  const getProfile = () => {
    dispatch(getProfileById(merchantId));
  };
  useEffect(() => {
    getProfile();
  }, [merchantId]);

  const profileData = useSelector((state) => state?.businessProfileReducer?.data);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [youtube, setYoutube] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') toast.error('Name cannot be empty');
    else if (description === '') toast.error('Description cannot be empty');
    else if (email === '') toast.error('Email cannot be empty');
    else if (mobile === '') toast.error('COntact number cannot be empty');
    else {
      const profileData = {
        name,
        description,
        email,
        mobile,
        facebook,
        instagram,
        twitter,
        youtube,
        merchantId
      };
      dispatch(addProfile(profileData));
      getProfile();
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      ' This action will delete all your products and data from the shop. Are you sure you want to delete your profile?'
    );
    if (isConfirmed) {
      dispatch(deleteProfile(merchantId));
      setTimeout(navigate('/'), 3000);
    }
  };
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="business-profile-container">
        {profileData && profileData !== null ? (
          <div className="business-profile-display-div">
            <div className="business-profile-div1">
              <h2>Your Business Profile</h2>
            </div>
            <div className="info-div">
              <p className="name-p">
                <strong>Name : </strong>&nbsp;
                {profileData?.name}
              </p>
            </div>
            <div className="info-div">
              <p className="name-p">
                <strong>Description : </strong>&nbsp;
                {profileData?.description}
              </p>
            </div>
            <div className="info-div">
              <div
                style={{
                  paddingRight: '10px',
                  width: '100%',
                  borderRight: '1px solid grey'
                }}>
                <p className="name-p">
                  <strong>Email : </strong>&nbsp;
                  {profileData?.contactDetails?.email}
                </p>
              </div>
              <div
                style={{
                  paddingLeft: '10px',
                  width: '100%',
                  borderLeft: '1px solid grey'
                }}>
                <p className="name-p">
                  <strong>Mobile : </strong>&nbsp;
                  {profileData?.contactDetails?.mobile}
                </p>
              </div>
            </div>
            <h5>Social Media Links : </h5>
            <div className="info-div">
              <div
                style={{
                  paddingRight: '10px',
                  width: '100%',
                  borderRight: '1px solid grey'
                }}>
                <p className="name-p">
                  <img src="/assets/facebook.png" alt="fb" />
                  {profileData?.socialMediaLinks?.facebook || 'No Link Added'}
                </p>
                <p className="name-p" style={{ marginTop: '20px' }}>
                  <img src="/assets/twitter.png" alt="fb" />
                  {profileData?.socialMediaLinks?.twitter || 'No Link Added'}
                </p>
              </div>
              <div
                style={{
                  paddingLeft: '10px',
                  width: '100%',
                  borderLeft: '1px solid grey'
                }}>
                <p className="name-p">
                  <img src="/assets/instagram.png" alt="fb" />
                  {profileData?.socialMediaLinks?.instagram || 'No Link Added'}
                </p>
                <p className="name-p" style={{ marginTop: '20px' }}>
                  <img src="/assets/youtube.png" alt="fb" />
                  {profileData?.socialMediaLinks?.youtube || 'No Link Added'}
                </p>
              </div>
            </div>
            <button onClick={handleDelete}>Delete Profile</button>
          </div>
        ) : !showForm ? (
          <div className="business-profile-div">
            <p>You do not have a business profile yet. Add one now :-</p>
            <button onClick={() => setShowForm(true)}>Add Profile</button>
          </div>
        ) : (
          <div className="business-profile-form">
            <h3>Add Profile Data :-</h3>
            <input
              type="text"
              placeholder="Business Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Business Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Business Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Business Contact Number"
              onChange={(e) => setMobile(e.target.value)}
            />
            <p>Social Media Links :-</p>
            <img src="/assets/facebook.png" alt="facebook" />
            <input
              type="text"
              placeholder="Facebook Profile Link"
              onChange={(e) => setFacebook(e.target.value)}
            />
            <br />
            <img src="/assets/instagram.png" alt="facebook" />
            <input
              type="text"
              placeholder="Instagram Profile Link"
              onChange={(e) => setInstagram(e.target.value)}
            />
            <br />
            <img src="/assets/twitter.png" alt="facebook" />
            <input
              type="text"
              placeholder="Twitter Profile Link"
              onChange={(e) => setTwitter(e.target.value)}
            />
            <br />
            <img src="/assets/youtube.png" alt="facebook" />
            <input
              type="text"
              placeholder="Youtube Profile Link"
              onChange={(e) => setYoutube(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Save</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
