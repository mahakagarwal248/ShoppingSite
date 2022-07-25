/* eslint linebreak-style: ["error", "windows"] */
const imageReducer = (action, state = { data: null }) => {
  switch (action.type) {
    case 'FILE':
      return { ...state };
    default:
      return state;
  }
};

export default imageReducer;
