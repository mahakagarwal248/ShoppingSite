const businessProfileReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'ADD_PROFILE':
      return { ...state, data: action.payload };
    case 'FETCH_PROFILE_BY_ID':
      return { ...state, data: action.payload };
    case 'DELETE_PROFILE':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default businessProfileReducer;
