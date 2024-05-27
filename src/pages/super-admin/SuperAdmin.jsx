import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/users.hook";
import UserTable from "./components/UserTable/UserTable";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Header from "./components/Header/Header";

export default function SuperAdmin() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {
    users,
    loadingUsers,
    isDeleteModalOpen,
    deleteAdmin,
    cancelDeletion,
    confirmDeletion,
    closeModal,
  } = useUsers();

  const addAdmin = () => {
    navigate("add-admin");
  };

  return (
    <div className="w-[100vw] h-full flex">
      <Sidebar />
      <main className="flex-1 w-[100vw] h-[100vh]  flex flex-col">
        <Header user={user} />
        <UserTable
          users={users}
          loadingUsers={loadingUsers}
          addAdmin={addAdmin}
          deleteAdmin={deleteAdmin}
        />
      </main>
      <Outlet />
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        closeModal={closeModal}
        cancelDeletion={cancelDeletion}
        confirmDeletion={confirmDeletion}
        loadingUsers={loadingUsers}
      />
    </div>
  );
}
