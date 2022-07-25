/* eslint linebreak-style: ["error", "windows"] */
const wishlistReducer = (action, state = { data: null }) => {
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
