import DisplayRazorpay from './Payment.helper';
import '../Cart/Cart.css';

function Payment({ userId }) {
  const handleCheckoutClick = () => {
    // Call the DisplayRazorpay component or its logic here
    DisplayRazorpay({ userId });
  };
  return (
    <div>
      <button type="submit" className="checkout-btn" onClick={handleCheckoutClick}>
        Checkout
      </button>
    </div>
  );
}

export default Payment;
