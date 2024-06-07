import { useState } from "react";
import { createPaymentIntent } from "../services/paymentService";

const usePayment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async (email, amount) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createPaymentIntent(email, amount);
      if (response.success) {
        setClientSecret(response.data.clientSecret);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { clientSecret, initiatePayment, loading, error };
};

export default usePayment;
