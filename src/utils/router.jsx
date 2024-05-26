import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup.jsx";
import Login from "../pages/login/Login.jsx";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import SuperAdmin from "../pages/super-admin/SuperAdmin.jsx";
import AddAdmin from "../pages/super-admin/components/AddAdmin/AddAdmin.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "super-admin",
        element: <SuperAdmin />,
        children: [
          {
            path: "add-admin",
            element: <AddAdmin />,
          },
        ],
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
