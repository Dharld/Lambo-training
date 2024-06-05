/* eslint-disable react/prop-types */
import Sidebar from "../../../../components/Sidebar/Sidebar";

const UserMenu = (
  <ul>
    <li className="flex flex-col items-center gap-2 text-gray-400 font-semibold px-4 py-4 rounded text-color mt-1">
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
      <span>Explore</span>
    </li>
  </ul>
);
export default function UserSidebar({ styles }) {
  return (
    <Sidebar showLabel={false} showLogo={false} styles={styles}>
      {UserMenu}
    </Sidebar>
  );
}
