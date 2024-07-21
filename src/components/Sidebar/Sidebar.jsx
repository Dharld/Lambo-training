import "./Sidebar.scss";
import Logo from "../Logo/Logo";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

/* eslint-disable react/prop-types */

const BREAKPOINT = 768;

export default function Sidebar({ children, showLogo = true, styles }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallerThanTablet, setIsSmallerThanTablet] = useState(true);
  const size = useWindowSize();

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setIsSmallerThanTablet(size.width < BREAKPOINT);
  }, [size]);

  return (
    <>
      {isSmallerThanTablet && !isOpen && (
        <div
          className="fixed bg-white hover:bg-gray-100 hover:w-14 border top-[80px] left-0 w-12 h-8 p-2 z-[1100] rounded-tr-full rounded-br-full transition  grid place-items-center  justify-center cursor-pointer hidden-960md:flex"
          onClick={openSidebar}
        >
          <AiOutlineRight className="text-gray-600" />
        </div>
      )}
      <div
        className={`${
          styles ?? ""
        } border-r bg-white border-r-slate-100 w-fit max-w-72 flex flex-col justify-between sidebar-height transition ${
          isSmallerThanTablet && !isOpen
            ? "fixed -translate-x-full"
            : "relative translate-x-0"
        }`}
      >
        {showLogo && (
          <div className="flex justify-center">
            <Logo />
          </div>
        )}
        <nav className="flex flex-1 flex-col text-violet relative">
          {isSmallerThanTablet && isOpen && (
            <div
              className="bg-gray-100 border top-0 bottom-0 my-auto -right-4 transition-colors w-8 h-8 grid place-items-center p-2 absolute justify-center rounded-full cursor-pointer z-50 hidden-960md:flex"
              onClick={closeSidebar}
            >
              <AiOutlineLeft className="text-gray-600" />
            </div>
          )}
          {children}
        </nav>
      </div>
    </>
  );
}
