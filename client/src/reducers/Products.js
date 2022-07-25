/* eslint linebreak-style: ["error", "windows"] */
const productReducer = (action, state = { data: null }) => {
  switch (action.type) {
    case 'FETCH_ALL_PRODUCTS':
      return { ...state, data: action.payload };
    case 'FETCH_PRODUCTS_BY_CATEGORY':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default productReducer;
