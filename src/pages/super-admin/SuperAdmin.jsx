import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/users.hook";
import UserTable from "./components/UserTable/UserTable";
import ActionModal from "./components/ActionModal/ActionModal";
import { useState } from "react";
import Header from "../../components/Header/Header";

export default function SuperAdmin() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [type, setType] = useState("delete");

  const {
    users,
    loadingUsers,
    isModalOpen,
    openModal,
    cancelAction,
    confirmAction,
    closeModal,
  } = useUsers();

  const addAdmin = () => {
    navigate("add-admin");
  };

  return (
    <div className="w-[100vw] h-full flex">
      <Sidebar />
      <main className="flex-1 w-[100vw] h-[100vh]  flex flex-col">
        <Header user={user} title="Super Admin" />
        <UserTable
          users={users}
          loadingUsers={loadingUsers}
          addAdmin={addAdmin}
          openModal={(action) => {
            setType(action.type);
            openModal(action);
          }}
        />
      </main>
      <Outlet />
      <ActionModal
        type={type}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        cancelAction={cancelAction}
        confirmAction={confirmAction}
        loadingUsers={loadingUsers}
      />
    </div>
  );
}
