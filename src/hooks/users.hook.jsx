import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./toast.hook";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../store/slices/user/user.actions";

export const useUsers = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const loadingUsers = useSelector((state) => state.user.loading);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    dispatch(getAllUsers()).then((res) => {
      if (res.error && res.error.message) {
        showError(res.error.message);
        return;
      }
    });
  }, [dispatch, showError]);

  const closeModal = () => {
    setisModalOpen(false);
    setUser(null);
  };

  const openModal = (action) => {
    const { payload } = action;
    setisModalOpen(true);
    setUser(payload.user);
  };

  const cancelAction = () => {
    setUser(false);
    setisModalOpen(false);
  };

  const confirmAction = (action) => {
    const { type } = action;
    if (type === "delete") {
      confirmDeletion();
    } else {
      confirmUpdate();
    }
  };

  const confirmDeletion = () => {
    if (!user) return;

    dispatch(deleteUser({ id: user.user_id })).then((res) => {
      if (res.error && res.error.message) {
        showError(res.payload);
        setUser(null);
        setisModalOpen(false);
        return;
      }
      setUser(null);
      setisModalOpen(false);
      showSuccess("User deleted");
    });
  };

  const confirmUpdate = () => {
    if (!user) return;

    dispatch(updateUser({ id: user.user_id })).then((res) => {
      if (res.error && res.error.message) {
        showError(res.payload);
        setUser(null);
        setisModalOpen(false);
        return;
      }
      setUser(null);
      setisModalOpen(false);
      showSuccess("User updated");
    });
  };

  const getUser = () => {
    return user;
  };
  return {
    users,
    loadingUsers,
    isModalOpen,
    openModal,
    confirmAction,
    cancelAction,
    closeModal,
    getUser,
  };
};
