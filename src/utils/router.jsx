import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup.jsx";
import Login from "../pages/login/Login.jsx";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import SuperAdmin from "../pages/super-admin/SuperAdmin.jsx";
import AddAdmin from "../pages/super-admin/components/AddAdmin/AddAdmin.jsx";
import DeleteAdmin from "../pages/super-admin/components/DeleteAdmin/DeleteAdmin.jsx";

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
            path: "add-admin",
            element: <AddAdmin />,
          },
        ],
      },
      {
        path: "/delete-admin/:id",
        element: <DeleteAdmin />,
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
