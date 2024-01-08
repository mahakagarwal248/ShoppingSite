import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModalStep, showModal } from '../../actions/Common';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //   width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  textAlign: 'center'
};

function ModalComp({ children }) {
  const show = useSelector((state) => state.showModalReducer.data);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(showModal(false));
    dispatch(setModalStep(0));
  };
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}

export default ModalComp;
