/* eslint linebreak-style: ["error", "windows"] */
const imageReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'FILE':
      return { ...state };
    default:
      return state;
  }
};

export default imageReducer;
