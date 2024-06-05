import { useEffect, useState } from "react";
import { useToast } from "../../hooks/toast.hook";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { signup } from "../../store/slices/auth/auth.actions";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [credentials, setCredentials] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (user) {
      if (user.role === "Super Admin") {
        navigate("/super-admin");
      } else if (user.role === "Admin") {
        navigate("/admin");
      } else if (user.role === "User") {
        navigate("/");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      showError("Email and password are required");
      return;
    }

    if (credentials.confirmPassword != credentials.password) {
      showError("Passwords do not match");
      return;
    }

    dispatch(signup({ credentials })).then((action) => {
      if (action.error) {
        return;
      }
      showSuccess("You are successfully signed up!");
      setCredentials(INITIAL_STATE);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid items-center w-full h-[100vh] place-items-center my-auto overflow-auto px-2 bg-slate-50"
    >
      <div className="wrapper w-full max-w-[450px] mx-auto bg-white p-10 rounded-md shadow-sm shadow-sky-100">
        <h1 className="secondary-font font-bold text-2xl">Signup</h1>
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={credentials.name}
          handleChange={handleChange}
          label="Name"
          styles="mt-12"
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={credentials.email}
          handleChange={handleChange}
          label="Email"
          styles="mt-12"
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={credentials.password}
          handleChange={handleChange}
          label="Password"
          styles={"mt-12"}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          styles={"mt-12"}
        />

        <div className="already-account text-right mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-underline text-sky-500">
              Login
            </Link>
          </p>
        </div>
        <Button type="submit" loading={loading} styles="mt-10">
          Signup
        </Button>
      </div>
    </form>
  );
}
