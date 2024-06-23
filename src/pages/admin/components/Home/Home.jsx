import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/toast.hook";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import {
  AiOutlineBook,
  AiOutlineEdit,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { useDispatch } from "react-redux";

import { useModal } from "../../../../hooks/modal.hook";
import "./Home.scss";
import { logout as logoutAction } from "../../../../store/slices/auth/auth.actions";

export default function Home() {
  const { isOpen, closeModal, modalContent } = useModal();

  const { showError, showSuccess } = useToast();
  const dispatch = useDispatch();

  /* const handleDelete = () => {
    const d = modalContent;
    setLoading(true);
    dispatch(deleteDraft(d.draft_id))
      .then((res) => {
        if (res.error) {
          showError(res.error);
          return;
        }
        localStorage.removeItem("draft");
        setDrafts(drafts.filter((draft) => draft.draft_id !== d.draft_id));
        showSuccess("The draft has been deleted successfully");
        closeModal();
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
  }; */

  const logout = () => {
    dispatch(logoutAction()).then((res) => {
      if (res.error && res.error.message) {
        showError(res.error.message);
        return;
      }
      showSuccess("Logged out successfully");
    });
  };

  return (
    <div className="flex-1 flex">
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="w-[400px] h-[220px] bg-white rounded-md flex flex-col  px-8 justify-center">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Are you sure?
            </h2>
            <p className="text-base text-slate-500 text-center mt-2">
              Do you really want to delete this draft
            </p>
            <div className="flex mt-4 gap-1">
              <Button
                handleClick={() => {
                  closeModal();
                }}
              >
                Cancel
              </Button>
              <Button
                handleClick={handleDelete}
                styles="bg-transparent border border-violet-500 text-violet-400 hover:bg-violet-400 hover:text-white"
                isDisabled={loading}
                loading={loading}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <Sidebar showLabel={false} showLogo={false}>
        <ul className="flex flex-col flex-direction items-center transition-colors">
          <NavLink
            className={({ isActive }) =>
              `p-4 flex-1 flex flex-col justify-center items-center group transition-all ${
                isActive ? "text-violet-500" : ""
              }
             `
            }
            to="/admin/home/drafts"
          >
            <AiOutlineEdit className="text-3xl text-gray-500 group-hover:text-violet-500" />
            <span className="text-gray-400 group-hover:text-violet-500 text-xs font-bold mt-1">
              My Drafts
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `p-4 flex-1 flex flex-col justify-center items-center group transition-all ${
                isActive ? "text-violet-500" : ""
              }
             `
            }
            to="/admin/home/courses"
          >
            <AiOutlineBook className="text-3xl text-gray-500 group-hover:text-violet-500" />
            <span className="text-gray-400 group-hover:text-violet-500 text-xs font-bold mt-1">
              My Courses
            </span>
          </NavLink>
        </ul>
        <div className="flex-1"></div>
        <ul>
          <li className="p-4 flex-1 flex flex-col justify-center items-center group transition-all">
            <AiOutlineSetting className="text-3xl text-gray-500 group-hover:text-violet-500" />
            <span className="text-gray-400 group-hover:text-violet-500 text-xs font-bold mt-1">
              Settings
            </span>
          </li>
          <li
            className="p-4 flex-1 flex flex-col justify-center items-center group transition-all cursor-pointer"
            onClick={logout}
          >
            <AiOutlineLogout className="text-3xl text-gray-500 group-hover:text-violet-500" />
            <span className="text-gray-400 group-hover:text-violet-500 text-xs font-bold mt-1">
              Logout
            </span>
          </li>
        </ul>
      </Sidebar>
      <div className="flex-1 pb-2 mx-auto flex flex-col relative overflow-scroll custom-height">
        <Outlet />
      </div>
    </div>
  );
}
