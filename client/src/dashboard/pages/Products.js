import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import Sidebar from '../Sidebar';
import { getMerchantProducts } from '../../actions/Products';
import { setModalProduct, setModalStep, showModal } from '../../actions/Common';

function Products() {
  const User = JSON.parse(localStorage.getItem('Profile'));
  const merchantId = User?.result?._id;

  const dispatch = useDispatch();
  const getProducts = () => dispatch(getMerchantProducts(merchantId));

  useEffect(() => {
    getProducts();
  }, [merchantId]);

  const customEqual = (oldValue, newValue) => {
    return oldValue === newValue;
  };

  const productList = useSelector((state) => state.productReducer, customEqual);

  const handleClick = (product) => {
    dispatch(setModalStep(1));
    dispatch(setModalProduct(product));
    dispatch(showModal(true));
  };

  let image;
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="products-container">
        <div className="products-div">
          {productList.data &&
            productList.data.length > 0 &&
            productList.data.map((products, index) => {
              image = `data:${products.img.contentType};base64, ${products.img.data}`;
              return (
                <div key={index}>
                  <Card className="cards">
                    <Card.Img
                      variant="top"
                      src={image}
                      className="card-img"
                      onClick={() => handleClick(products)}
                    />
                    <Card.Body
                      style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                      <div style={{ margin: 'auto' }}>
                        <Card.Title style={{ margin: 0, fontSize: '20px' }}>
                          {products.name}
                        </Card.Title>
                        <Card.Text
                          style={{ margin: '8px 0', fontSize: '16px', cursor: 'pointer' }}
                          onClick={() => handleClick(products)}>
                          {products.description.length > 80
                            ? `${products.description.substring(0, 80)}...`
                            : products.description}
                        </Card.Text>
                        <Card.Text style={{ marginTop: 0 }}>
                          <span style={{ fontSize: '16px', marginBottom: 0 }}>
                            <strong>Brand - </strong>
                            {products.brand}
                          </span>
                          <br />
                          <span style={{ fontSize: '16px', marginTop: 0, marginBottom: 0 }}>
                            <strong>Price - </strong>INR {products.price}
                          </span>
                          <br />
                          <span style={{ fontSize: '16px', marginBottom: '10px' }}>
                            <strong>Quantity Available - </strong>
                            {products?.quantity || 5}
                          </span>
                        </Card.Text>
                      </div>

                      <div></div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Products;
