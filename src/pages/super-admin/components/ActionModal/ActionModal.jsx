/* eslint-disable react/prop-types */
import Modal from "../../../../components/Modal/Modal";
import { useModal } from "../../../../hooks/modal.hook";
import { useUsers } from "../../../../hooks/users.hook";
import { useToast } from "../../../../hooks/toast.hook";
import AddModal from "../AddModal/AddModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import { useState } from "react";

export default function ActionModal() {
  const [loading, setLoading] = useState(false);

  const { isOpen, modalContent, closeModal } = useModal();
  const { deleteUser } = useUsers();
  const { showError, showSuccess } = useToast();

  if (!isOpen) {
    return null;
  }

  const { type, payload } = modalContent;

  let user = payload ? payload.user : null;

  const handleDelete = async () => {
    setLoading(true);
    await deleteUser(user).then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
      setLoading(false);
      showSuccess("User has been deleted successfully");
      closeModal();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {type === "delete" ? (
        <DeleteModal
          user={user}
          loading={loading}
          handleDelete={handleDelete}
        />
      ) : type === "edit" ? (
        <UpdateModal user={user} />
      ) : (
        <AddModal />
      )}
    </Modal>
  );
}
