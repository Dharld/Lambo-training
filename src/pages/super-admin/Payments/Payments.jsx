import { useEffect, useState } from "react";
import usePayment from "../../../hooks/payment.hook";
import { useToast } from "../../../hooks/toast.hook";
import Spinner from "../../../components/Spinner/Spinner";
import PaymentList from "./PaymentList/PaymentList";
import "./Payments.scss";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const { showError } = useToast();
  const { getAllPayment } = usePayment();

  useEffect(() => {
    getAllPayment().then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
      const payments = res.payload;
      setPayments(payments);
    });
  }, [showError]);

  if (payments.length == 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
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
