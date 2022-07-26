/* eslint linebreak-style: ["error", "windows"] */
const wishlistReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return { ...state };
    case 'FETCH_WISHLIST_PRODUCTS':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default wishlistReducer;
