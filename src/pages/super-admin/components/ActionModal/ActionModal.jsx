/* eslint-disable react/prop-types */
import Modal from "../../../../components/Modal/Modal";
import { useModal } from "../../../../hooks/modal.hook";
import DeleteModal from "../DeleteModal/DeleteModal";
import UpdateModal from "../UpdateModal/UpdateModal";

export default function ActionModal() {
  const { isOpen, modalContent, closeModal } = useModal();

  if (!isOpen) {
    return null;
  }

  const {
    type,
    payload: { user },
  } = modalContent;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {type === "delete" ? (
        <DeleteModal user={user} />
      ) : (
        <UpdateModal user={user} />
      )}
    </Modal>
  );
}
