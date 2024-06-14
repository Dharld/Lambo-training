import AdminMenu from "../../pages/admin/components/AdminMenu/AdminMenu";
import { VERTICAL } from "../../utils/constants";
import Sidebar from "../Sidebar/Sidebar";

export default function AdminSidebar() {
  return (
    <Sidebar showLabel={false} showLogo={false}>
      <AdminMenu direction={VERTICAL} />
    </Sidebar>
  );
}
