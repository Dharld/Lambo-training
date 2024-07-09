import { useSelector, useDispatch } from "react-redux";
import UserHeader from "./components/UserHeader/UserHeader.jsx";
import {
  AiOutlineBook,
  AiOutlineEdit,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { logout as logoutAction } from "../../store/slices/auth/auth.actions.js";
import { useToast } from "../../hooks/toast.hook.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { NavLink } from "react-router-dom";

export default function User() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();

  const logout = () => {
    dispatch(logoutAction()).then((res) => {
      if (res.error && res.error.message) {
        showError(res.error.message);
        return;
      }
      showSuccess("Logged out successfully");
    });
  };
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <UserHeader user={user} />
      <Sidebar showLabel={false} showLogo={false}>
        <ul className="flex flex-col flex-direction items-center transition-colors">
          <NavLink
            className={({ isActive }) =>
              `p-4 flex-1 flex flex-col justify-center items-center group transition-all ${
                isActive ? "text-violet-500" : ""
              }
             `
            }
            to="/admin/home/drafts"
          >
            <AiOutlineEdit className="text-3xl text-gray-500 group-hover:text-violet-500" />
            <span className="text-gray-400 group-hover:text-violet-500 text-xs font-bold mt-1">
              My Drafts
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `p-4 flex-1 flex flex-col justify-center items-center group transition-all ${
                isActive ? "text-violet-500" : ""
              }
             `
            }
            to="/admin/home/courses"
          >
            <AiOutlineBook className="text-3xl text-gray-500 group-hover:text-violet-500" />
            <span className="text-gray-400 group-hover:text-violet-500 text-xs font-bold mt-1">
              My Courses
            </span>
          </NavLink>
        </ul>
        <div className="flex-1"></div>
        <ul>
          <li className="p-4 flex-1 flex flex-col justify-center items-center group transition-all">
            <AiOutlineSetting className="text-3xl text-gray-500 group-hover:text-violet-500" />
            <span className="text-gray-400 group-hover:text-violet-500 text-xs font-bold mt-1">
              Settings
            </span>
          </li>
          <li
            className="p-4 flex-1 flex flex-col justify-center items-center group transition-all cursor-pointer"
            onClick={logout}
          >
            <AiOutlineLogout className="text-3xl text-gray-500 group-hover:text-violet-500" />
            <span className="text-gray-400 group-hover:text-violet-500 text-xs font-bold mt-1">
              Logout
            </span>
          </li>
        </ul>
      </Sidebar>
    </div>
  );
}
