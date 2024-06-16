import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Admin() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex flex-col overflow-auto bg-slate-50">
      <Header user={user} title="Admin" />
      <Outlet />
    </div>
  );
}
