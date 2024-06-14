import MobileMenu from "../../../../components/MobileMenu/MobileMenu";
import { HORIZONTAL } from "../../../../utils/constants";
import AdminMenu from "../AdminMenu/AdminMenu";

export default function AdminMobileMenu() {
  return (
    <MobileMenu>
      <AdminMenu direction={HORIZONTAL} />
    </MobileMenu>
  );
}
