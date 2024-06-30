import Button from "../../../../../../../components/Button/Button";
import emptyFolder from "../../../../../../../assets/images/empty-folder.png";

export default function EmptyPage() {
  return (
    <div className="w-full h-[300px] grid place-items-center">
      <div className="bg-gray-100 w-[192px] h-[192px] rounded-full grid place-items-center">
        <img
          src={emptyFolder}
          alt=""
          className="w-[128px] h-[128px] object-cover"
        />
      </div>
      <Button>Create New Question</Button>
    </div>
  );
}
