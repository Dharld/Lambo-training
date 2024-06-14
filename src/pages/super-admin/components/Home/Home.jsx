import { useUsers } from "../../../../hooks/users.hook";
import UserTable from "../UserTable/UserTable";
import ActionModal from "../ActionModal/ActionModal";

export default function Home() {
  const { users, loadingUsers } = useUsers();

  return (
    <div className="container">
      <main className="w-[100vw] h-[100%] flex-1 flex flex-col px-4">
        <UserTable users={users} loadingUsers={loadingUsers} />
      </main>
      <ActionModal />
    </div>
  );
}
