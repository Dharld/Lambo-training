import Sidebar from "../Sidebar/Sidebar";

const AdminMenu = (
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
);
export default function AdminSidebar() {
  return <Sidebar>{AdminMenu}</Sidebar>;
}
