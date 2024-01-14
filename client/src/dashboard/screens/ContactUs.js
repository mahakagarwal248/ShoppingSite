import './index.css';
import ModalComp from '../../components/general/Modal';
import { setModalStep, showModal } from '../../actions/Common';
import { useDispatch } from 'react-redux';

function ContactUs() {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(showModal(false));
    dispatch(setModalStep(0));
  };
  return (
    <div>
      <ModalComp>
        <div className="delete-container">
          <p>Drop us an email at :</p>
          <p>easycoding2000@gmail.com</p>
          <button className="delete-cancel-btn" onClick={handleCancel}>
            Close
          </button>
        </div>
      </ModalComp>
    </div>
  );
}

export default ContactUs;
