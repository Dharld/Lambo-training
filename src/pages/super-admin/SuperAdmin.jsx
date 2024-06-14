import { useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";
import AdminMobileMenu from "../admin/components/AdminMobileMenu/AdminMobileMenu";

export default function SuperAdmin() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <AdminHeader user={user} />
      <div className="w-[100vw] h-full flex">
        <div className="hidden">
          <AdminSidebar />
        </div>
        <AdminMobileMenu />
        <Outlet />
      </div>
    </div>
  );
}
