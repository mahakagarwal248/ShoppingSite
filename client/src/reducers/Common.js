export const setModalStepReducer = (state = { data: 0 }, action) => {
  switch (action.type) {
    case 'SET_MODAL_STEP':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const showModalReducer = (state = { data: false }, action) => {
  switch (action.type) {
    case 'SET_SHOW_MODAL':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const modalProductReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'SET_MODAL_PRODUCT':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
