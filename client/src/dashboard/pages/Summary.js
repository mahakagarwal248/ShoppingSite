import '../Dashboard.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMerchantOrders } from '../../actions/Orders';
import TableComp from '../../components/general/Table';
function Summary() {
  const User = JSON.parse(localStorage.getItem('Profile'));
  const merchantId = User?.result?._id;

  const dispatch = useDispatch();
  const getOrders = () => {
    dispatch(fetchMerchantOrders(merchantId));
  };
  useEffect(() => {
    getOrders();
  }, [merchantId]);

  const orderDetails = useSelector((state) => state?.ordersReducer?.data);
  const columns = [
    '',
    'Product Name',
    'Quantity',
    'Customer Name',
    'Customer Email',
    'Customer Mobile',
    'Customer Address',
    'Placed On'
  ];
  const rowKeys = [
    'productId.img',
    'productId.name',
    'quantity',
    'userId.name',
    'userId.email',
    'userId.mobile',
    'userId.address',
    'createdAt'
  ];
  return (
    <div className="summary-container">
      <div className="summary-card-div">
        <div>
          <div>
            <h5>
              Products
              <br /> Added
            </h5>
            <h2>0</h2>
          </div>
          <img src="/assets/products-added.png" alt="icon" />
        </div>
        <div>
          <div>
            <h5>
              Products
              <br /> Sold
            </h5>
            <h2>0</h2>
          </div>
          <img src="/assets/products-sold.png" alt="icon" />
        </div>
        <div>
          <div>
            <h5>
              Rvenue
              <br /> Generated
            </h5>
            <h2>0</h2>
          </div>
          <img src="/assets/revenue.png" alt="icon" />
        </div>
        <div>
          <div>
            <h5>
              Products
              <br /> Added
            </h5>
            <h2>0</h2>
          </div>
          <img src="/assets/products-added.png" alt="icon" />
        </div>
      </div>
      <h2>Welcome, {User?.result?.name}</h2>
      <div className="summary-recent-orders">
        <h3>Recent Orders:</h3>
        {!orderDetails ? (
          <h2>Loading...</h2>
        ) : orderDetails.length === 0 ? (
          <h4>No orders has been placed for your products yet!</h4>
        ) : (
          <div>
            <TableComp data={orderDetails} columns={columns} rowKeys={rowKeys} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;
