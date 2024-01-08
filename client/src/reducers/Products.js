const productReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'FETCH_ALL_PRODUCTS':
      return { ...state, data: action.payload };
    case 'FETCH_PRODUCTS_BY_CATEGORY':
      return { ...state, data: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, data: action.payload };
    case 'FETCH_MERCHANT_PRODUCTS':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default productReducer;
