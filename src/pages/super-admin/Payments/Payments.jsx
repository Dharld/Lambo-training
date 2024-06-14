import { useEffect, useState } from "react";
import usePayment from "../../../hooks/payment.hook";
import { useToast } from "../../../hooks/toast.hook";
import Spinner from "../../../components/Spinner/Spinner";
import PaymentList from "./PaymentList/PaymentList";
import ATMCard from "../../../assets/images/atm-card.png";

import "./Payments.scss";

export default function Payments() {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const { showError } = useToast();
  const { getAllPayment } = usePayment();

  useEffect(() => {
    setLoading(true);
    getAllPayment().then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
      const payments = res.payload;
      setPayments(payments);
      setLoading(false);
    });
  }, [showError]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-center max-w-[500px]">
          <img
            src={ATMCard}
            alt="No payments illustration"
            className="mb-4 w-[150px] object-cover mx-auto"
          />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">
            No payments found
          </h2>
          <p className="text-gray-500">
            It looks like you haven't made any payments yet. Once you users will
            start making payments, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 container mx-auto">
      <h1 className="text-2xl font-bold text-gray-600 mb-4">Payments</h1>
      <PaymentList payments={payments} />
    </div>
  );
}
