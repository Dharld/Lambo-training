import AdminMenu from "../../pages/admin/components/AdminMenu/AdminMenu";
import Sidebar from "../Sidebar/Sidebar";

export default function AdminSidebar() {
  return (
    <Sidebar showLabel={false} showLogo={false}>
      <AdminMenu />
    </Sidebar>
  );
}
