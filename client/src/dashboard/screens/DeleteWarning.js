import './index.css';
import ModalComp from '../../components/general/Modal';

function DeleteWarning({ setShowDeleteWarning, handleDelete }) {
  const handleCancel = () => {
    setShowDeleteWarning(false);
  };
  return (
    <div>
      <ModalComp>
        <div className="delete-container">
          <p> This action will delete this product from the website.</p>
          <p> Are you sure you want to proceed?</p>
          <button className="delete-yes-btn" onClick={handleDelete}>
            Yes
          </button>
          <button className="delete-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </ModalComp>
    </div>
  );
}

export default DeleteWarning;
