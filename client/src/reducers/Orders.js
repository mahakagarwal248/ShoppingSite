const ordersReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'FETCH_USER_ORDERS':
      return { ...state, data: action.payload };
    case 'FETCH_MERCHANT_ORDERS':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default ordersReducer;
