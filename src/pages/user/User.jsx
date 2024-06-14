import { useSelector } from "react-redux";
import UserHeader from "./components/UserHeader/UserHeader.jsx";
import UserSidebar from "./components/UserSidebar/UserSidebar.jsx";
import { Outlet } from "react-router-dom";
import UserMobileMenu from "./components/UserMobileMenu/UserMobileMenu.jsx";

export default function User() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <UserHeader user={user} />
      <main className="flex flex-1">
        <div className="hidden">
          <UserSidebar />
        </div>
        <UserMobileMenu />
        <Outlet />
      </main>
    </div>
  );
}
