import { useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";
import AdminMobileMenu from "../admin/components/AdminMobileMenu/AdminMobileMenu";

export default function SuperAdmin() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="h-[100vh] flex flex-col">
      <AdminHeader user={user} />
      <div className="flex flex-1 h-full">
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        <div className="md:hidden">
          {" "}
          <AdminMobileMenu />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
