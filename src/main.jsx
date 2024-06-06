import React from "react";
import ReactDOM from "react-dom/client";
import { ToasterProvider } from "./hooks/toast.hook.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./_index.scss";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(publishableKey);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToasterProvider>
      <Elements stripe={stripePromise} options={options}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Elements>
    </ToasterProvider>
  </React.StrictMode>
);
