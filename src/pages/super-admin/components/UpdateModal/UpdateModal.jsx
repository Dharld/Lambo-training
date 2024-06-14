/* eslint-disable react/prop-types */
import { useState } from "react";
import { useToast } from "../../../../hooks/toast.hook";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import { useUsers } from "../../../../hooks/users.hook";
import { useModal } from "../../../../hooks/modal.hook";

export default function UpdateModal({ user }) {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUsers();
  const { closeModal } = useModal();
  const { showError, showSuccess } = useToast();

  const [creds, setCreds] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (creds.name === "" || creds.email === "") {
      showError("Please fill in all fields");
      return;
    }
    setLoading(true);
    await updateUser({ ...user, ...creds }).then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
      setLoading(false);
      showSuccess("User updated");
      closeModal();
    });
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
      </form>
      <div className="flex mt-4 gap-1">
        <Button styles="">Cancel</Button>
        <Button
          handleClick={handleSubmit}
          styles="bg-transparent border border-violet-500 text-violet-400 hover:bg-violet-400 hover:text-white"
          isDisabled={loading}
          loading={loading}
        >
          Update User
        </Button>
      </div>
    </div>
  );
}
