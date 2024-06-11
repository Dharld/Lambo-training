import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup.jsx";
import Login from "../pages/login/Login.jsx";
import App from "../App.jsx";
import SuperAdmin from "../pages/super-admin/SuperAdmin.jsx";
import AddAdmin from "../pages/super-admin/components/AddAdmin/AddAdmin.jsx";
import Admin from "../pages/admin/Admin.jsx";
import AddCourse from "../pages/admin/components/AddCourse/AddCourse.jsx";
import Home from "../pages/admin/components/Home/Home.jsx";
import { default as HomeSuperAdmin } from "../pages/super-admin/components/Home/Home.jsx";
import User from "../pages/user/User.jsx";
import Checkout from "../pages/checkout/Checkout.jsx";
import PaymentStatus from "../pages/payment-status/PaymentStatus.jsx";
import { default as HomeUser } from "../pages/user/components/Home/Home.jsx";
import Courses from "../pages/super-admin/components/Courses/Courses.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "super-admin",
        element: <SuperAdmin />,
        children: [
          {
            path: "",
            element: <HomeSuperAdmin />,
          },
          {
            path: "add-admin",
            element: <AddAdmin />,
          },
          {
            path: "courses",
            element: <Courses />,
          },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "add-course",
            element: <AddCourse />,
          },
        ],
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "",
        element: <User />,
        children: [
          {
            path: "",
            element: <HomeUser />,
          },
        ],
      },
      {
        path: "checkout/:courseId",
        element: <Checkout />,
      },
      {
        path: "payment-status",
        element: <PaymentStatus />,
      },
    ],
  },
]);
