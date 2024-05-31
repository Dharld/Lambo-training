/* eslint-disable react/prop-types */
import Table from "../../../../components/Table/Table";
import Spinner from "../../../../components/Spinner/Spinner";
import EmptyState from "../EmptyState/EmptyState";

const UserTable = ({ users, loadingUsers, addAdmin, openModal }) => {
  return (
    <div className="flex-1 bg-gray-50 rounded-xl">
      {loadingUsers ? (
        <div className="w-full h-full grid place-items-center">
          <Spinner />
        </div>
      ) : users.length > 0 ? (
        <div>
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">All Users</h2>
            <button
              className="bg-sky-400 text-white px-4 py-2 rounded-md"
              onClick={addAdmin}
            >
              Add User
            </button>
          </div>
          <div className="p-4">
            <Table data={users} openModal={openModal} />
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default UserTable;
