/* eslint-disable react/prop-types */
import { formatDate } from "../../../../utils/date";
import "./PaymentList.scss";

const PaymentListHeader = () => {
  return (
    <div className="bg-gray-50 w-full flex">
      <div className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></div>
      <div className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider longest">
        Course Title
      </div>
      <div className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider other">
        Amount
      </div>
      <div className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider other">
        Date
      </div>
      <div className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider other">
        Name
      </div>
    </div>
  );
};

function PaymentListBody({ payments }) {
  return (
    <div className="PaymentListBody">
      {payments.map((p) => (
        <div key={p.payment_id} className="p-4 px-0 bg-white border-b flex">
          <div className="shrink-0 grow-0 w-12 text-center">{p.payment_id}</div>
          <div className="longest">{p.course_title}</div>
          <div className="other">${p.amount}</div>
          <div className="other">{formatDate(new Date(p.payment_date))}</div>
          <div className="px-2 other">{p.user_name}</div>
        </div>
      ))}
    </div>
  );
}

export default function PaymentList({ payments }) {
  return (
    <div className="flex flex-col">
      <PaymentListHeader />
      <PaymentListBody payments={payments} />
    </div>
  );
}
