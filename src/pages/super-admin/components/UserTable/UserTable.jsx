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
        <div className="max-w-5xl w-full mx-auto">
          <div className="flex items-center justify-between pt-6 pb-2">
            <h2 className="text-lg font-bold text-gray-600">All Users</h2>
            <button
              className="bg-sky-400 text-white px-4 py-2 rounded-md"
              onClick={openAddModal}
            >
              Add User
            </button>
          </div>
          <div className="mt-4">
            <Table data={users} />
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default UserTable;
