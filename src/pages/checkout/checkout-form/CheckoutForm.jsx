/* eslint-disable react/prop-types */
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useToast } from "../../../hooks/toast.hook";
import Button from "../../../components/Button/Button";
import Chip from "../../../components/Chip/Chip";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CheckoutForm({ course, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const { showError, showSuccess } = useToast();

  const layout = {
    type: "tabs",
    defaultCollapsed: false,
  };

  const paymentElementOptions = {
    layout,
  };

  const publicUrl = import.meta.env.VITE_SUPABASE_IMAGE;

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    elements.submit();

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://lambo-training.netlify.app/payment-status",
      },
    });

    if (result.error) {
      showError(result.error.message);
    } else {
      showSuccess("Payment successful");
    }

    setLoading(false);
  };

  return (
    <form
      className="h-screen bg-gray-100 py-4 px-4 overflow-auto md:grid md:place-items-center"
      onSubmit={handleSubmit}
    >
      {course && (
        <div className="w-full max-w-4xl bg-white rounded-lg overflow-scroll">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-8">
              <h1 className="font-semibold text-3xl mb-4">Checkout</h1>
              <p className="text-gray-600 text-lg leading-6 mb-4">
                {course?.title}
              </p>
              <Chip text={course?.level} styles="mt-2 mb-4" />
              <div className="bg-slate-200 h-[200px] relative rounded-md overflow-hidden mb-4">
                <img
                  src={publicUrl + course.thumbnail_url}
                  className="absolute w-full h-full object-cover"
                  alt="Course Thumbnail"
                />
              </div>
              <p className="text-3xl font-bold text-gray-700 mb-2">
                ${course?.price}
              </p>
              <p className="text-lg text-gray-600">{course?.description}</p>
            </div>
            <div className="flex-1 p-8 bg-gray-50">
              <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                <PaymentElement options={paymentElementOptions} />
                <Button
                  type="submit"
                  styles="w-full mt-8"
                  isDisabled={!stripe}
                  loading={loading}
                >
                  Pay
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
