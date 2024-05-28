/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { useToast } from "../../../../hooks/toast.hook";
import Input from "../../../../components/Input/Input";

export default function ActionModal({
  isModalOpen,
  closeModal,
  type,
  cancelAction,
  confirmAction,
  loadingUsers,
}) {
  const DeleteModal = () => {
    return (
      <div className="w-[400px] h-[220px] bg-white rounded-md flex flex-col  px-8 justify-center">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Are you sure?
        </h2>
        <p className="text-base text-slate-500 text-center mt-2">
          You won't be able to retrieve those records Are you sure
        </p>
        <div className="flex mt-4 gap-1">
          <Button
            handleClick={() => cancelAction({ type: "delete" })}
            styles=""
            isDisabled={loadingUsers}
          >
            Cancel
          </Button>
          <Button
            handleClick={() => confirmAction({ type: "delete" })}
            styles="bg-transparent border border-sky-500 text-sky-400 hover:bg-sky-400 hover:text-white"
            isDisabled={loadingUsers}
            loading={loadingUsers}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };
  const UpdateModal = () => {
    const [creds, setCreds] = useState({
      name: "",
      email: "",
      password: "",
    });

    const { showError } = useToast();

    const handleChange = (e) => {
      setCreds({
        ...creds,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (creds.name === "" || creds.email === "" || creds.password === "") {
        showError("Please fill in all fields");
        return;
      }
      confirmAction("update");
    };

    return (
      <div className="w-[400px] py-8 bg-white rounded-md flex flex-col  px-8 justify-center">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Update User
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Name"
            value={creds.name}
            handleChange={handleChange}
            placeholder="Enter the supervisor's name"
            styles={"mt-8"}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            value={creds.email}
            handleChange={handleChange}
            placeholder="Enter the supervisor's email"
            styles={"mt-8"}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={creds.password}
            handleChange={handleChange}
            placeholder="Enter the supervisor's password"
            styles={"mt-8"}
          />
        </form>
        <div className="flex mt-4 gap-1">
          <Button
            handleClick={() => cancelAction({ type: "update" })}
            styles=""
            isDisabled={loadingUsers}
          >
            Cancel
          </Button>
          <Button
            handleClick={() => confirmAction({ type: "update" })}
            styles="bg-transparent border border-sky-500 text-sky-400 hover:bg-sky-400 hover:text-white"
            isDisabled={loadingUsers}
            loading={loadingUsers}
          >
            Update User
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {type === "delete" ? <DeleteModal /> : <UpdateModal />}
    </Modal>
  );
}
