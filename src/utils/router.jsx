import { Navigate, createBrowserRouter } from "react-router-dom";
import Signup from "../pages/signup/Signup.jsx";
import Login from "../pages/login/Login.jsx";
import App from "../App.jsx";
import SuperAdmin from "../pages/super-admin/SuperAdmin.jsx";
import Admin from "../pages/admin/Admin.jsx";
import Home from "../pages/admin/components/Home/Home.jsx";
import { default as HomeSuperAdmin } from "../pages/super-admin/components/Home/Home.jsx";
import User from "../pages/user/User.jsx";
import Checkout from "../pages/checkout/Checkout.jsx";
import PaymentStatus from "../pages/payment-status/PaymentStatus.jsx";
import { default as HomeUser } from "../pages/user/components/Home/Home.jsx";
import Courses from "../pages/super-admin/components/Courses/Courses.jsx";
import Payments from "../pages/super-admin/Payments/Payments.jsx";
import Learn from "../pages/user/components/Learn/Learn.jsx";
import AddDraftCourse from "../pages/admin/components/AddDraftCourse/AddDraftCourse.jsx";
import EditDraftCourse from "../pages/admin/components/EditDraftCourse/EditDraftCourse.jsx";
import Audience from "../pages/admin/components/EditDraftCourse/components/Audience.jsx";
import Content from "../pages/admin/components/EditDraftCourse/components/Content.jsx";
import Landing from "../pages/admin/components/EditDraftCourse/components/Landing.jsx";
import Drafts from "../pages/admin/components/Drafts.jsx";
import AuthorCourses from "../pages/admin/components/AuthorCourses.jsx";
import CoursePreview from "../pages/admin/components/CoursePreview/CoursePreview.jsx";

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
            path: "home",
            element: <HomeSuperAdmin />,
          },
          {
            path: "courses",
            element: <Courses />,
          },
          {
            path: "payments",
            element: <Payments />,
          },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "home",
            element: <Home />,
            children: [
              {
                path: "",
                element: <Navigate replace to="drafts" />,
              },
              {
                path: "drafts",
                element: <Drafts />,
              },
              {
                path: "courses",
                element: <AuthorCourses />,
              },
              {
                path: "preview/:courseId",
                element: <CoursePreview />,
              },
            ],
          },
          {
            path: "courses/new-draft",
            element: <AddDraftCourse />,
          },
          {
            path: "courses/draft/edit",
            element: <EditDraftCourse />,
            children: [
              {
                path: "audience",
                element: <Audience />,
              },
              {
                path: "content",
                element: <Content />,
              },
              {
                path: "landing",
                element: <Landing />,
              },
            ],
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
          {
            path: "learn",
            element: <Learn />,
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
