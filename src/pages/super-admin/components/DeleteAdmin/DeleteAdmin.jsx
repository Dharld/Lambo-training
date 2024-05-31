import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { useState } from "react";
import Overlay from "../../../../components/Overlay/Overlay";

export default function DeleteAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    closeModal();
    navigate(-1);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <h1 className="text-2xl text-slate-800 font-bold">
        Confirm User Deletion
      </h1>
      <p className="text-slate-500 my-2">
        Are you sure you want to delete this user? This action cannot be undone.
        Once deleted, all user data, including their account details,
        preferences, and associated records, will be permanently removed and
        cannot be recovered.
      </p>
      <p className="text-slate-500 my-2">
        Please confirm that you want to proceed with this irreversible action.
      </p>
      <div className="my-4 flex justify-end space-x-2">
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </Modal>
  );
}
