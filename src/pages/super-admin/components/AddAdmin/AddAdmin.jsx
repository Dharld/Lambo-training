import { useEffect, useState } from "react";
import Overlay from "../../../../components/Overlay/Overlay";
import Input from "../../../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import { useToast } from "../../../../hooks/toast.hook";
import { useDispatch, useSelector } from "react-redux";
import { addSupervisor } from "../../../../store/slices/user/user.actions";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

export default function AddAdmin() {
  const [creds, setCreds] = useState(INITIAL_STATE);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const { showSuccess, showError } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (error && error.message) {
      showError(error.message);
    }
  }, [error, showError]);

  const closeOverlay = () => {
    setIsOverlayVisible(false);
    navigate("../");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreds({
      ...creds,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (creds.name === "" || creds.email === "" || creds.password === "") {
      showError("Please fill in all fields");
      return;
    }
    await dispatch(addSupervisor(creds)).then((res) => {
      if (res.error && res.error.message) {
        showError(res.payload);
        return;
      }
      showSuccess("Supervisor added successfully!");
      closeOverlay();
    });
  };

  return (
    <div className="fixed w-full h-full grid place-items-center">
      <Overlay isVisible={isOverlayVisible} onClose={closeOverlay}>
        <form
          className="w-[400px] bg-white py-6 px-8 rounded-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-slate-800 font-bold">
            Add new supervisor
          </h1>
          <Input
            name="name"
            label="Name"
            value={creds.name}
            handleChange={handleChange}
            placeholder="Enter the supervisor's name"
            styles={"mt-8"}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            value={creds.email}
            handleChange={handleChange}
            placeholder="Enter the supervisor's email"
            styles={"mt-8"}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={creds.password}
            handleChange={handleChange}
            placeholder="Enter the supervisor's password"
            styles={"mt-8"}
          />
          <Button loading={loading}>Add new supervisor</Button>
        </form>
      </Overlay>
    </div>
  );
}
