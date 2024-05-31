import { useDispatch } from "react-redux";
import { useToast } from "./../../hooks/toast.hook";
import { logout as logoutAction } from "../../store/slices/auth/auth.actions";
import "./Sidebar.scss";
<<<<<<< HEAD
import Logo from "../Logo/Logo";
=======
>>>>>>> 21e73ff149714f0ed0d152b70218876b8801f68e

/* eslint-disable react/prop-types */

export default function Sidebar() {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();

  const logout = () => {
    console.log("Here");
    dispatch(logoutAction()).then((res) => {
      if (res.error && res.error.message) {
        showError(res.error.message);
        return;
      }
      showSuccess("Logged out successfully");
    });
  };

  return (
    <div className="h-[100vh] w-full max-w-72 px-8 py-4 flex flex-col ">
<<<<<<< HEAD
      <Logo />
=======
      <h1 className="h-12 w-12 text-white rounded-sm font-bold grid place-items-center bg-sky-500">
        LT
      </h1>
>>>>>>> 21e73ff149714f0ed0d152b70218876b8801f68e
      <nav className="flex-1 flex flex-col mt-6 text-sky">
        <ul>
          <li className="flex gap-2 bg-sky-50 text-sky-500 font-semibold px-4 py-4 rounded text-color">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-current"
              >
                <g id="_01_align_center" data-name="01 align center">
                  <path d="M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z" />
                  <path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z" />
                </g>
              </svg>
            </i>
            <span className="-md:hidden">Users</span>
          </li>
          <li className="flex gap-2 text-gray-400 font-semibold px-4 py-4 rounded text-color mt-1">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-current"
              >
                <path d="m19,0H5c-1.654,0-3,1.346-3,3v21h20V3c0-1.654-1.346-3-3-3ZM5,2h14c.551,0,1,.448,1,1v2H4v-2c0-.552.449-1,1-1Zm-1,20V7h16v15H4Zm3-12h10v2H7v-2Zm0,4h6v2h-6v-2Z" />
              </svg>
            </i>
            <span className="-md:hidden">Courses</span>
          </li>
          <li className="flex gap-2 text-gray-400 font-semibold px-4 py-4 rounded text-color mt-1">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <g id="_01_align_center" data-name="01 align center">
                  <circle cx="5.5" cy="15.5" r="1.5" />
                  <path d="M21,3H3A3,3,0,0,0,0,6V21H24V6A3,3,0,0,0,21,3ZM3,5H21a1,1,0,0,1,1,1V8H2V6A1,1,0,0,1,3,5ZM2,19V10H22v9Z" />
                </g>
              </svg>
            </i>
            <span className="-md:hidden">Payments</span>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li className="flex gap-2 text-gray-400 font-semibold px-4 py-4 rounded text-color">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <g id="_01_align_center" data-name="01 align center">
                  <path d="M15,24H9V20.487a9,9,0,0,1-2.849-1.646L3.107,20.6l-3-5.2L3.15,13.645a9.1,9.1,0,0,1,0-3.29L.107,8.6l3-5.2L6.151,5.159A9,9,0,0,1,9,3.513V0h6V3.513a9,9,0,0,1,2.849,1.646L20.893,3.4l3,5.2L20.85,10.355a9.1,9.1,0,0,1,0,3.29L23.893,15.4l-3,5.2-3.044-1.758A9,9,0,0,1,15,20.487Zm-4-2h2V18.973l.751-.194A6.984,6.984,0,0,0,16.994,16.9l.543-.553,2.623,1.515,1-1.732-2.62-1.513.206-.746a7.048,7.048,0,0,0,0-3.75l-.206-.746,2.62-1.513-1-1.732L17.537,7.649,16.994,7.1a6.984,6.984,0,0,0-3.243-1.875L13,5.027V2H11V5.027l-.751.194A6.984,6.984,0,0,0,7.006,7.1l-.543.553L3.84,6.134l-1,1.732L5.46,9.379l-.206.746a7.048,7.048,0,0,0,0,3.75l.206.746L2.84,16.134l1,1.732,2.623-1.515.543.553a6.984,6.984,0,0,0,3.243,1.875l.751.194Zm1-6a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z" />
                </g>
              </svg>
            </i>
            <span className="-md:hidden">Settings</span>
          </li>
          <li
            className="flex gap-2 text-gray-400 font-semibold px-4 py-4 rounded text-color"
            onClick={logout}
          >
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-current"
              >
                <path d="M22.763,10.232l-4.95-4.95L16.4,6.7,20.7,11H6.617v2H20.7l-4.3,4.3,1.414,1.414,4.95-4.95a2.5,2.5,0,0,0,0-3.536Z" />
                <path d="M10.476,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H9.476a1,1,0,0,1,1,1V8.333h2V3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H9.476a3,3,0,0,0,3-3V15.667h-2Z" />
              </svg>
            </i>
            <span className="-md:hidden">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
