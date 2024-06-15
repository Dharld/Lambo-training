/* eslint-disable react/prop-types */
import Table from "../../../../components/Table/Table";
import Spinner from "../../../../components/Spinner/Spinner";
import EmptyState from "../EmptyState/EmptyState";
import { useModal } from "../../../../hooks/modal.hook";

const UserTable = ({ users, loadingUsers }) => {
  const { openModal } = useModal();

  const openAddModal = () => {
    openModal({
      type: "add",
      payload: null,
    });
  };

  return (
    <div className="flex-1 rounded-xl">
      {loadingUsers ? (
        <div className="w-full h-full grid place-items-center">
          <Spinner />
        </div>
      ) : users.length > 0 ? (
        <div className="max-w-4xl w-full mx-auto flex flex-col h-[100vh]">
          <div className="flex items-center justify-between pt-4 pb-2">
            <h2 className="text-lg font-bold text-gray-600">All Users</h2>
            <button
              className="bg-violet-400 text-white px-4 py-2 rounded-md"
              onClick={openAddModal}
            >
              Add User
            </button>
          </div>
          <Table data={users} />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default UserTable;
