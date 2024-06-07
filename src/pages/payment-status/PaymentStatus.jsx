/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import digitalWallet from "../../assets/images/wallet.png";
import error from "../../assets/images/delete.png";
import Button from "../../components/Button/Button";

const Success = ({ handleAction }) => {
  return (
    <>
      <img src={digitalWallet} alt="" className="w-full" />
      <p className="my-4 text-gray-500">
        Congratulations! Your payment was successfully processed. Thank you for
        your purchase!
      </p>
      <Button handleClick={handleAction}>Go to Home</Button>
    </>
  );
};

const Failure = ({ handleAction }) => {
  return (
    <>
      <img src={error} alt="" className="w-full" />
      <p className="my-4 text-gray-500">
        Sorry! Your payment was not successful. Please try again.
      </p>
      <Button handleClick={handleAction} error={true}>
        <Link to="../">Go to Home</Link>
      </Button>
    </>
  );
};
export default function PaymentStatus() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("redirect_status");

  const navigate = useNavigate();

  const handleAction = () => {
    navigate("../");
  };

  return (
    <div className="w-full h-[100vh] grid place-items-center">
      <div className="wrapper max-w-[300px]">
        {status === "succeeded" ? (
          <Success handleAction={handleAction} />
        ) : (
          <Failure handleAction={handleAction} />
        )}
      </div>
    </div>
  );
}
