import Button from "../../../../components/Button/Button";
import cap from "../../../../assets/images/graduation-cap.png";

export default function EmptyState() {
  return (
    <div className="w-full h-full grid  relative">
      <div className="max-w-[400px] mx-auto mt-16 text-center">
        <div className="w-[128px] h-[128px] grid mx-auto">
          <img className="" src={cap} alt="" />
        </div>
        <h1 className="text-3xl font-bold">No Courses Yet!</h1>
        <p>
          Currently, no courses are listed. Add new courses to enhance the
          platform and offer students valuable learning opportunities!
        </p>
        <div className="mt-8">
          <Button>Create A course </Button>
        </div>
      </div>
    </div>
  );
}
