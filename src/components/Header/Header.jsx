/* eslint-disable react/prop-types */
// import Searchbar from "../../../../components/searchbar/Searchbar";
import { useState } from "react";
import Logo from "../Logo/Logo";
import Popup from "../Popup/Popup";
import Searchbar from "../searchbar/Searchbar";

import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../store/slices/auth/auth.actions";
import { useToast } from "../../hooks/toast.hook";
import { AiOutlineBell } from "react-icons/ai";

export default function Header({ user, showLogo = true, actions }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(logoutAction()).then((res) => {
      if (res.error) {
        showError("Couldn't log out");
        return;
      }
      showSuccess("You are successfully logged out!");
    });
  };

  return (
    <div className="sticky top-0 z-[2000] px-4 py-4 bg-white border-b border-b-slate-100 flex items-center h-[64px]">
      {showLogo && <Logo />}

      <div className="flex-1"></div>
      <Searchbar />
      <AiOutlineBell className="flex-shrink-0 text-3xl hover:text-violet-500 cursor-pointer mr-3" />
      {actions && actions()}
      {user && (
        <div
          className="font-bold relative select-none cursor-pointer text-zinc-600"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>{user.name}</span>
          <Popup isOpen={open}>
            <li onClick={logout} className="text-zinc-600 px-4 py-2">
              Logout
            </li>
          </Popup>
        </div>
      )}
    </div>
  );
}
