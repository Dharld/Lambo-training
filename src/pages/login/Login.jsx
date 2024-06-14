import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/toast.hook";
import { login } from "../../store/slices/auth/auth.actions";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./Login.scss";
import "./../../App.scss";

const INITIAL_STATE = {
  email: "",
  password: "",
};

export default function Login() {
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
        navigate("/super-admin/home");
      } else if (user.role === "Admin") {
        navigate("/admin/home");
      } else if (user.role === "Customer") {
        navigate("/");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      showError("Email and password are required");
      return;
    }
    dispatch(login({ credentials })).then((action) => {
      if (action.error) {
        return;
      }
      showSuccess("You are successfully logged in!");
      setCredentials(INITIAL_STATE);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid items-center w-full h-[100vh] place-items-center my-auto overflow-auto px-2 bg-slate-50"
    >
      <div className="wrapper w-full max-w-[450px] mx-auto bg-white p-10 rounded-md shadow-sm shadow-violet-100">
        <h1 className="secondary-font font-bold text-2xl">
          Login to your account
        </h1>
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

        <div className="already-account text-right mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-underline text-violet-500">
              Sign up
            </Link>
          </p>
        </div>
        <Button type="submit" loading={loading} styles="mt-10">
          Login
        </Button>
      </div>
    </form>
  );
}
