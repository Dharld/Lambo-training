/* eslint-disable react/prop-types */
import NavbarLink from "../../../../components/NavLink/NavLink";
import Sidebar from "../../../../components/Sidebar/Sidebar";

const UserMenu = (
  <ul className="max-w-[100px] flex flex-col">
    <NavbarLink to="" title="Learn">
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
    </NavbarLink>
    <NavbarLink to="explore" title="Explore">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="fill-current"
      >
        <g id="_01_align_center" data-name="01 align center">
          <path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
        </g>
      </svg>
    </NavbarLink>
  </ul>
);
export default function UserSidebar({ styles }) {
  return (
    <Sidebar showLabel={false} showLogo={false} styles={styles}>
      {UserMenu}
    </Sidebar>
  );
}
