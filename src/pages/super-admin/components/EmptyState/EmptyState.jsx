import inbox from "../../../../assets/images/inbox.png";
import Button from "../../../../components/Button/Button.jsx";
import { useModal } from "../../../../hooks/modal.hook.jsx";

export default function EmptyState() {
  const { openModal } = useModal();

  const open = () => {
    openModal({
      type: "add",
      payload: null,
    });
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="max-w-[400px] text-center">
        <div className="w-[128px] h-[128px] grid place-items-center mx-auto">
          <img className="" src={inbox} alt="" />
        </div>
        <h1 className="text-3xl font-bold">No Admins Yet!</h1>
        <p>
          Add new admins to manage the platform and enhance user experience. Get
          started now!
        </p>
        <div className="mt-8">
          <Button handleClick={open}>Add Admin</Button>
        </div>
      </div>
    </div>
  );
}
