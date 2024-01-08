// import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import { initiatePayment, paymentCallback } from '../../actions/Payment';
import { toast } from 'react-toastify';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
async function DisplayRazorpay({ userId }) {
  console.log(userId);
  //   const dispatch = useDispatch();
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  console.log('==', userId);
  // creating a new order
  const paymentData = await initiatePayment(userId);

  //   const paymentData = useSelector((state) => state.paymentReducer);
  console.log(paymentData);

  if (!paymentData) {
    alert('Server error. Are you online?');
    return;
  }

  const { amount, id: order_id, currency } = paymentData.data.order;

  const options = {
    key: 'rzp_test_AwDzw08aAMJ9qk', // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: currency,
    name: paymentData?.data?.customerDetails?.name,
    description: 'Test Transaction',
    image: { logo },
    order_id: order_id,
    handler: async function (response) {
      const data = {
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature
      };

      const res = await paymentCallback(data);
      if (res.status === 200) toast.success('Order Placed Successfully');
      else toast.error(res.data?.msg);
      setTimeout(() => (window.location.href = '/'), 3000);
    },
    prefill: {
      name: paymentData.data?.customerDetails.name,
      email: paymentData.data?.customerDetails.email,
      contact: paymentData.data?.customerDetails.mobile || '9999999999'
    },
    notes: {
      address: paymentData.data?.customerDetails.address || 'Soumya Dey Corporate Office'
    },
    theme: {
      color: '#61dafb'
    }
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

export default DisplayRazorpay;
