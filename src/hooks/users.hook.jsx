import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./toast.hook";
import { deleteUser, getAllUsers } from "../store/slices/user/user.actions";

export const useUsers = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idUserToDelete, setIdUserToDelete] = useState(null);
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
    setIsDeleteModalOpen(false);
    setIdUserToDelete(null);
  };

  const deleteAdmin = (id) => {
    setIsDeleteModalOpen(true);
    setIdUserToDelete(id);
  };

  const cancelDeletion = () => {
    setIdUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeletion = () => {
    if (!idUserToDelete) return;

    dispatch(deleteUser({ id: idUserToDelete })).then((res) => {
      if (res.error && res.error.message) {
        showError(res.payload);
        setIdUserToDelete(null);
        setIsDeleteModalOpen(false);
        return;
      }
      setIdUserToDelete(null);
      setIsDeleteModalOpen(false);
      showSuccess("User deleted");
    });
  };

  return {
    users,
    loadingUsers,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deleteAdmin,
    cancelDeletion,
    confirmDeletion,
    closeModal,
  };
};
