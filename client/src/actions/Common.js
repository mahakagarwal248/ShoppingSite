export const setModalStep = (step) => async (dispatch) => {
  dispatch({ type: 'SET_MODAL_STEP', payload: step });
  return;
};

export const showModal = (value) => async (dispatch) => {
  dispatch({ type: 'SET_SHOW_MODAL', payload: value });
  return;
};

export const setModalProduct = (data) => async (dispatch) => {
  dispatch({ type: 'SET_MODAL_PRODUCT', payload: data });
  return;
};
