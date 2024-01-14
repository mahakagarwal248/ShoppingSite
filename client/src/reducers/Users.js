// import AddCookie from '../components/general/AddCookie';

const userReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('Profile', JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };
    case 'LOGOUT':
      localStorage.clear();
      return { ...state, data: null };
    case 'GET_ALL_USERS':
      return { ...state, data: action?.data };
    case 'GET_SECURITY_QUES':
      return { ...state, data: action?.data };
    case 'FORGOT_PASSWORD':
      localStorage.setItem('email', JSON.stringify({ email: action?.data }));
      return { ...state, data: action?.data };
    case 'VERIFY_PASSWORD':
      return { ...state };
    case 'UPDATED_PASSWORD':
      localStorage.removeItem('email');
      return { ...state };
    case 'UPLOAD_PROFILE_PHOTO':
      var existingData = localStorage.getItem('Profile');
      existingData = JSON.parse(existingData);
      existingData.result.profilePicture = action?.data?.profilePicture;
      localStorage.setItem('Profile', JSON.stringify(existingData));
      return { ...state, data: action?.data };
    default:
      return state;
  }
};

export default userReducer;
