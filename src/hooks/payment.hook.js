import { useState } from "react";
import paymentService from "../services/paymentService";
import { getAllPayment as getAllPaymentAction } from "../store/slices/payment/payment.action";
import { useDispatch } from "react-redux";

const usePayment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const initiatePayment = async ({ email, amount, userId, courseId }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentService.createPaymentIntent({
        email,
        amount,
        userId,
        courseId,
      });
      if (response.success) {
        setClientSecret(response.data.clientSecret);
        setPaymentId(response.data.paymentId);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllPayment = () => {
    return dispatch(getAllPaymentAction());
  };

  return { clientSecret, initiatePayment, getAllPayment, loading, error };
};

export default usePayment;
