import { useState } from "react";
import { useUsers } from "../../../../hooks/users.hook";
import { useNavigate } from "react-router-dom";
import UserTable from "../UserTable/UserTable";
import ActionModal from "../ActionModal/ActionModal";

export default function Home() {
  const navigate = useNavigate();

  const { users, loadingUsers } = useUsers();

  const addAdmin = () => {
    navigate("add-admin");
  };

  return (
    <div>
      <main className="flex-1 w-[100vw] h-[100vh]  flex flex-col">
        <UserTable
          users={users}
          loadingUsers={loadingUsers}
          addAdmin={addAdmin}
        />
      </main>
      <ActionModal />
    </div>
  );
}
