import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar';
import { addProduct } from '../../actions/Products';
import { useState } from 'react';
function AddProduct() {
  const dispatch = useDispatch();

  var User = JSON.parse(localStorage.getItem('Profile'));

  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState('');

  const handleFileInput = (e) => {
    e.preventDefault();
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      quantity,
      category,
      brand,
      price,
      merchantId: User?.result?._id
    };
    const fileData = new FormData();
    fileData.append('file', thumbnail);
    Object.keys(productData).forEach((key) => {
      fileData.append(key, productData[key]);
    });
    console.log(fileData);
    dispatch(addProduct(fileData));
  };
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="add-product-container">
        <div className="add-product-div">
          <div className="add-product-heading-div">
            <h3>Add New Product</h3>
          </div>
          <div className="add-product-form">
            <input
              type="text"
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Product Description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <br />
            <input
              type="number"
              placeholder="Product Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Product Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Product Brand"
              onChange={(e) => setBrand(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Product Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <div className="add-product-inner-div">
              <label style={{ marginRight: '10px', color: 'gray' }}>Upload Thumbnail :</label>
              <input type="file" placeholder="Product Name" onChange={(e) => handleFileInput(e)} />
            </div>
            <button className="add-product-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
