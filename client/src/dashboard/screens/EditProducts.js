import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalComp from '../../components/general/Modal';
import DeleteWarning from './DeleteWarning';
import EditWarning from './EditWarning';
import { useDispatch } from 'react-redux';
import { showModal, setModalStep } from '../../actions/Common';
import { deleteProduct, getMerchantProducts, updateProduct } from '../../actions/Products';

function EditProducts() {
  const User = JSON.parse(localStorage.getItem('Profile'));
  const merchantId = User?.result?._id;

  const customEqual = (oldValue, newValue) => {
    return oldValue === newValue;
  };

  const product = useSelector((state) => state.modalProductReducer.data, customEqual);
  const image = `data:${product.img.contentType};base64, ${product.img.data}`;

  const dispatch = useDispatch();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showEditWarning, setShowEditWarning] = useState(false);

  const [isEditable, setIsEditable] = useState(false);

  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleClose = () => {
    dispatch(showModal(false));
    dispatch(setModalStep(0));
  };

  const handleEditClick = () => {
    setShowEditWarning(true);
  };
  const handleDeleteClick = () => {
    setShowDeleteWarning(true);
  };
  const handleSubmitClick = () => {
    dispatch(updateProduct({ merchantId, productId: product?._id, description, quantity }));
    dispatch(getMerchantProducts(merchantId));
    setIsEditable(false);
    dispatch(showModal(false));
    dispatch(setModalStep(0));
  };
  const handleCancelClick = () => {
    setIsEditable(false);
  };
  const handleDelete = () => {
    dispatch(deleteProduct({ merchantId, productId: product?._id }));
    dispatch(getMerchantProducts(merchantId));
    dispatch(showModal(false));
    dispatch(setModalStep(0));
  };
  const handleEdit = () => {
    setShowEditWarning(false);
    setIsEditable(true);
  };
  const handleInputChange = (field, data) => {
    if (field === 'description') {
      setDescription(data);
    } else if (field === 'quantity') {
      setQuantity(data);
    }
  };
  return (
    <div>
      <ModalComp>
        <div style={{ display: 'inline-flex' }}>
          <h3>Product Details</h3>
          <button className="product-modal-cross-btn" onClick={handleClose}>
            X
          </button>
        </div>
        <div className="product-modal-container">
          <div className="product-modal-container-div1">
            <img src={image} alt="product" />
          </div>
          <div className="product-modal-container-div2">
            <h3>{product.name}</h3>

            <p>
              <strong>Description : </strong>
              {isEditable ? (
                <>
                  <br />
                  <textarea
                    type="text"
                    value={description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </>
              ) : (
                product.description
              )}
            </p>
            <p>
              <strong>Brand : </strong>
              {product.brand}
            </p>
            <p>
              <strong>Quantity Available : </strong>
              {isEditable ? (
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                />
              ) : (
                product.quantity
              )}
            </p>
            <p>
              <strong>Price : </strong>
              {product.price}
            </p>
            <button className="edit-btn" onClick={isEditable ? handleSubmitClick : handleEditClick}>
              {isEditable ? 'Submit' : 'Edit'}
            </button>
            <button
              className="delete-btn"
              onClick={isEditable ? handleCancelClick : handleDeleteClick}>
              {isEditable ? 'Cancel' : 'Delete'}
            </button>
          </div>
        </div>
        {showDeleteWarning && (
          <DeleteWarning setShowDeleteWarning={setShowDeleteWarning} handleDelete={handleDelete} />
        )}
        {showEditWarning && (
          <EditWarning
            setShowEditWarning={setShowEditWarning}
            handleEdit={handleEdit}
            message={'You can edit the description and quantiy only'}
          />
        )}
      </ModalComp>
    </div>
  );
}

export default EditProducts;
