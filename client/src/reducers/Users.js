/* eslint linebreak-style: ["error", "windows"] */
const userReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('Profile', JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };
    case 'LOGOUT':
      localStorage.clear();
      return { ...state, data: null };
    case 'FORGOT_PASSWORD':
      return { ...state };
    case 'UPDATED_PASSWORD':
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;
