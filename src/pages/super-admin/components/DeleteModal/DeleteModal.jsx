/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Button from "../../../../components/Button/Button";

const DEFAULT_TITLE =
  "You won't be able to retrieve those records Are you sure";

export default function DeleteModal({
  handleCancel,
  handleDelete,
  loading,
  title = DEFAULT_TITLE,
}) {
  return (
    <div className="w-[400px] h-[220px] bg-white rounded-md flex flex-col  px-8 justify-center">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Are you sure?
      </h2>
      <p className="text-base text-slate-500 text-center mt-2">{title}</p>
      <div className="flex mt-4 gap-1">
        <Button handleClick={handleCancel}>Cancel</Button>
        <Button
          handleClick={handleDelete}
          styles="bg-transparent border border-sky-500 text-sky-400 hover:bg-sky-400 hover:text-white"
          isDisabled={loading}
          loading={loading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
