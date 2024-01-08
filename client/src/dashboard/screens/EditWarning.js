import './index.css';
import ModalComp from '../../components/general/Modal';

function EditWarning({ setShowEditWarning, handleEdit, message }) {
  const handleCancel = () => {
    setShowEditWarning(false);
  };
  return (
    <div>
      <ModalComp>
        <div className="edit-container">
          <p>{message}</p>
          <p> Are you sure you want to proceed?</p>
          <button className="edit-yes-btn" onClick={handleEdit}>
            Yes
          </button>
          <button className="edit-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </ModalComp>
    </div>
  );
}

export default EditWarning;
