import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/Header/Header";
import { logout as logoutAction } from "../../../../store/slices/auth/auth.actions";
import {
  AiOutlineArrowRight,
  AiOutlineBook,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { useToast } from "../../../../hooks/toast.hook";

export default function Home() {
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
    <div className="flex-1 h-fullbg-gray-50">
      <Header user={user} />
      <div className="flex">
        <Sidebar showLabel={false} showLogo={false}>
          <ul className="flex flex-col flex-direction items-center transition-colors">
            <NavLink
              className={({ isActive }) =>
                `p-4 flex-1 flex flex-col justify-center items-center group transition-all ${
                  isActive ? "text-violet-500" : ""
                }
             `
              }
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
        <main className="flex-1 transition">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
