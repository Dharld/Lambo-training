import { useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";

export default function SuperAdmin() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <AdminHeader user={user} />
      <div className="w-[100vw] h-full flex">
        <AdminSidebar />
        <Outlet />
      </div>
    </div>
  );
}
