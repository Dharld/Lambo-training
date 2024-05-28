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
  const [idUserToDelete, setIdUserToDelete] = useState(null);
  const [idUserToUpdate, setIdUserToUpdate] = useState(null);
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

  const closeModal = (action) => {
    const { type } = action;
    if (type === "delete") {
      setisModalOpen(false);
      setIdUserToDelete(null);
    } else {
      setisModalOpen(false);
      setIdUserToUpdate(null);
    }
  };

  const openModal = (action) => {
    console.log(action);
    const { type, payload } = action;
    if (type === "delete") {
      setisModalOpen(true);
      setIdUserToDelete(payload.id);
    } else {
      setisModalOpen(true);
      setIdUserToUpdate(payload.id);
    }
  };

  const cancelAction = (action) => {
    const { type } = action;
    if (type === "delete") {
      setIdUserToDelete(null);
      setisModalOpen(false);
    } else {
      setIdUserToUpdate(null);
      setisModalOpen(false);
    }
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
    if (!idUserToDelete) return;

    dispatch(deleteUser({ id: idUserToDelete })).then((res) => {
      if (res.error && res.error.message) {
        showError(res.payload);
        setIdUserToDelete(null);
        setisModalOpen(false);
        return;
      }
      setIdUserToDelete(null);
      setisModalOpen(false);
      showSuccess("User deleted");
    });
  };

  const confirmUpdate = () => {
    if (!idUserToUpdate) return;

    dispatch(updateUser({ id: idUserToUpdate })).then((res) => {
      if (res.error && res.error.message) {
        showError(res.payload);
        setIdUserToUpdate(null);
        setisModalOpen(false);
        return;
      }
      setIdUserToUpdate(null);
      setisModalOpen(false);
      showSuccess("User updated");
    });
  };
  return {
    users,
    loadingUsers,
    isModalOpen,
    openModal,
    confirmAction,
    cancelAction,
    closeModal,
  };
};
