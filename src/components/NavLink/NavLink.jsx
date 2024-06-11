/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const NavbarLink = ({ children, to, title }) => {
  return (
    <li className=" text-gray-400">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${
            isActive ? "active" : ""
          } flex flex-col items-center justify-center gap-2  py-3`
        }
      >
        <i>{children}</i>
        <span className="text-center text-sm leading-4">{title}</span>
      </NavLink>
    </li>
  );
};

export default NavbarLink;
