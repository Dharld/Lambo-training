import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import Searchbar from "../../components/searchbar/Searchbar";
import EmptyState from "./components/EmptyState/EmptyState";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../store/slices/user/user.actions";
import { useToast } from "../../hooks/toast.hook";
import Spinner from "../../components/Spinner/Spinner";
import Table from "../../components/Table/Table";

export default function SuperAdmin() {
  const loadingUsers = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const { showError, showSuccess } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers()).then((res) => {
      if (res.error && res.error.message) {
        showError(res.payload);
        return;
      }
      setUsers(res.payload);
    });
  }, [dispatch, showError]);

  const addAdmin = () => {
    navigate("add-admin");
  };
  return (
    <div className="w-[100vw] h-full flex">
      <Sidebar />
      <main className="flex-1 w-[100vw] h-[100vh]  flex flex-col">
        <header className="px-4 py-4  bg-white flex items-center ">
          <h1 className="text-2xl font-bold text-gray-800">Super Admin</h1>
          <div className="flex-1"></div>
          <Searchbar />
          <div className="bg-gray-100 py-4 px-4 rounded-full cursor-pointer hover:bg-sky-400 transition-colors text-slate-700 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-current"
            >
              <g id="_01_align_center" data-name="01 align center">
                <path d="M23.259,16.2l-2.6-9.371A9.321,9.321,0,0,0,2.576,7.3L.565,16.35A3,3,0,0,0,3.493,20H7.1a5,5,0,0,0,9.8,0h3.47a3,3,0,0,0,2.89-3.8ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm9.165-4.395a.993.993,0,0,1-.8.395H3.493a1,1,0,0,1-.976-1.217l2.011-9.05a7.321,7.321,0,0,1,14.2-.372l2.6,9.371A.993.993,0,0,1,21.165,17.605Z" />
              </g>
            </svg>
          </div>
          {user && <span className="ml-2 font-bold">{user.name}</span>}
        </header>
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
                <Table data={users} />
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
      <Outlet />
    </div>
  );
}
