/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import { removeFromCart } from "../../store/slices/cart/cart.slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cvv: "",
    expirationDate: "",
    cardHolderName: "",
  });

  const navigate = useNavigate();

  const handleRemoveFromCart = (course_id) => {
    dispatch(removeFromCart(course_id));
  };

  const handlePayment = () => {
    setShowPaymentForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Payment successful!");
      setLoading(false);
      setShowPaymentForm(false);
      navigate(-1);
    }, 2000); // Simulate a 2-second delay for payment processing
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item.course_id}
              className="p-4 border rounded-lg flex flex-col md:flex-row items-start md:items-center"
            >
              <img
                src={decodeURIComponent(item.thumbnail_url)}
                alt={item.title}
                className="w-32 h-20 object-cover mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-gray-600">{item.subtitle}</p>
                <p className="text-gray-800 font-semibold">${item.price}</p>
              </div>
              <Button
                fit={true}
                styles="bg-red-500 text-white hover:bg-red-700 mt-4 md:mt-0"
                handleClick={() => handleRemoveFromCart(item.course_id)}
              >
                Remove
              </Button>
            </div>
          ))}
          {!showPaymentForm && (
            <Button
              styles="bg-violet-500 text-white hover:bg-violet-700"
              handleClick={handlePayment}
            >
              Proceed to Payment
            </Button>
          )}
        </div>
      )}
      {showPaymentForm && (
        <form
          className="mt-8 p-4 border rounded-lg max-w-md mx-auto"
          onSubmit={handleSubmitPayment}
        >
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CVV</label>
            <input
              type="text"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              value={paymentDetails.expirationDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Card Holder Name</label>
            <input
              type="text"
              name="cardHolderName"
              value={paymentDetails.cardHolderName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <Button
            isDisabled={loading}
            loading={loading}
            styles="bg-violet-500 text-white hover:bg-violet-700 w-full"
            type="submit"
          >
            Confirm Payment
          </Button>
        </form>
      )}
    </div>
  );
}
