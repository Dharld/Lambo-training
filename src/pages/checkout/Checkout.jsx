import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout-form/CheckoutForm";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/toast.hook";
import Spinner from "../../components/Spinner/Spinner";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

export default function Checkout() {
  const [course, setCourse] = useState(null);
  const [options, setOptions] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Load the course and set the options
  useEffect(() => {
    const getClientSecret = () => {
      /* const { id } = course;
      fetch(`/api/stripe/create-checkout-session/${id}`)
       .then((res) => res.json())
       .then((data) => {
          setClientSecret(data.clientSecret);
        })
       .catch((err) => {
          console.log(err);
        }); */
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ clientSecret: "test" });
        }, 500);
      });
    };

    if (course) {
      const options = {
        mode: "payment",
        amount: +course.price,
        currency: "usd",
      };
      setOptions(options);
      getClientSecret().then((data) => {
        setClientSecret(data.clientSecret);
      });
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
      <CheckoutForm course={course} />
    </Elements>
  );
}
