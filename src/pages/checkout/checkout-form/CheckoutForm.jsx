/* eslint-disable react/prop-types */
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useToast } from "../../../hooks/toast.hook";
import Button from "../../../components/Button/Button";
import Chip from "../../../components/Chip/Chip";

export default function CheckoutForm({ course }) {
  const stripe = useStripe();
  const elements = useElements();

  const { showError, showSuccess } = useToast();

  const layout = {
    type: "tabs",
    defaultCollapsed: false,
  };

  const paymentElementOptions = {
    layout,
  };

  const publicUrl = process.env.REACT_APP_SUPABASE_IMAGE;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "localhost:3000",
      },
    });

    if (result.error) {
      showError(result.error.message);
    } else {
      showSuccess("Payment successful");
    }
  };
  return (
    <form
      className=" h-[100vh]  grid items-center bg-slate-50 relative"
      onSubmit={handleSubmit}
    >
      {course && (
        <div className="wrapper w-full max-w-[900px] mx-auto">
          <div className="flex flex-col md:flex-row gap-4 rounded-sm">
            <div className="flex-1  p-4 ">
              <h1 className="font-semibold text-2xl">Checkout</h1>
              <p className="text-gray-600 text-base leading-3 mt-2">
                {course?.title}
              </p>
              <Chip text={course?.level} styles="mt-2 mb-4" />
              <div className="bg-slate-200 h-[200px] relative rounded-md overflow-hidden mb-4">
                <img
                  src={publicUrl + course.thumbnail_url}
                  className="absolute w-full h-full object-cover"
                />
              </div>
              <img src="" alt="" />
              <p className=" font-bold text-3xl mb-1 text-gray-600">
                ${course?.price}
              </p>
              <p className=" text-lg">{course?.description}</p>
            </div>
            <div className="relative h-fit w-[50%] p-8 border border-slate-100 rounded-sm bg-white shadow-lg shadow-gray-100">
              <PaymentElement options={paymentElementOptions} />
              <Button type="submit" styles="w-full mt-8" isDisabled={!stripe}>
                Pay
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
