import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser as deleteUserAction,
  getAllUsers as getAllUsersAction,
  updateUser as updateUserAction,
} from "../store/slices/user/user.actions";

export const useUsers = () => {
  const loadingUsers = useSelector((state) => state.user.loading);
  const users = useSelector((state) => state.user.users);

  const dispatch = useDispatch();

  useEffect(() => {
    function getAllUsers() {
      dispatch(getAllUsersAction());
    }
    getAllUsers();
  }, [dispatch]);

  const deleteUser = (user) => {
    if (!user) return;
    return dispatch(deleteUserAction({ id: user.user_id }));
  };

  const updateUser = (user) => {
    if (!user) return;
    return dispatch(
      updateUserAction({
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      })
    );
  };

  return {
    users,
    loadingUsers,
    deleteUser,
    updateUser,
  };
};
