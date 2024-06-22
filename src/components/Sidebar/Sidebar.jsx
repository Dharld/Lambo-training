import "./Sidebar.scss";
import Logo from "../Logo/Logo";

/* eslint-disable react/prop-types */

export default function Sidebar({
  children,
  showLabel = true,
  showLogo = true,
  styles,
}) {
  return (
    <div
      className={`${
        styles ?? ""
      } w-fit max-w-72 flex flex-col justify-between border-r bg-white border-r-slate-100 sidebar-height`}
    >
      {showLogo && (
        <div className="flex justify-center">
          <Logo />
        </div>
      )}
      <nav className="flex-1 flex flex-col text-violet">{children}</nav>
    </div>
  );
}
