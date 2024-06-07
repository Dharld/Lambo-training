import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout-form/CheckoutForm";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import usePayment from "../../hooks/payment.hook";
import { useSelector } from "react-redux";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

export default function Checkout() {
  const [course, setCourse] = useState(null);
  const [options, setOptions] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { clientSecret, initiatePayment, loading, error } = usePayment();

  const currentUser = useSelector((state) => state.auth.user);

  // Load the course and set the options
  useEffect(() => {
    if (course) {
      const price = +course.price * 100;
      const options = {
        mode: "payment",
        amount: price,
        currency: "usd",
      };
      setOptions(options);
      initiatePayment(currentUser.email, price);
    }
  }, [course]);

  useEffect(() => {
    if (location.state.course) {
      setCourse(location.state.course);
    } else {
      navigate(-1);
    }
  }, [location.state.course, navigate]);

  if (!course || !options || !clientSecret) {
    return (
      <div className="w-full h-[100vh] grid place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm course={course} clientSecret={clientSecret} />
    </Elements>
  );
}
