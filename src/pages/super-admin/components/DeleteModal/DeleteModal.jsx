import Button from "../../../../components/Button/Button";
import { useUsers } from "../../../../hooks/users.hook";

export default function DeleteModal() {
  const { loadingUsers } = useUsers();
  return (
    <div className="w-[400px] h-[220px] bg-white rounded-md flex flex-col  px-8 justify-center">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Are you sure?
      </h2>
      <p className="text-base text-slate-500 text-center mt-2">
        You won't be able to retrieve those records Are you sure
      </p>
      <div className="flex mt-4 gap-1">
        <Button styles="" isDisabled={loadingUsers}>
          Cancel
        </Button>
        <Button
          styles="bg-transparent border border-sky-500 text-sky-400 hover:bg-sky-400 hover:text-white"
          isDisabled={loadingUsers}
          loading={loadingUsers}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
