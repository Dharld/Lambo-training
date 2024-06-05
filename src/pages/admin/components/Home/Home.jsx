import Button from "../../../../components/Button/Button";

import CourseList from "../../../../components/CourseList/CourseList";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("add-course");
  };

  return (
    <div className="container mx-auto py-4 flex-1">
      <div className="flex justify-between border-b border-b-slate-100 pb-2 relative z-10">
        <h1 className="text-slate-500 font-bold text-2xl">My Courses</h1>
        <div className="flex-1"></div>
        <Button fit={true} styles="cursor-pointer" handleClick={handleNavigate}>
          Add Course
        </Button>
      </div>
      <div className="w-full h-full">
        {/*         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-400 to-sky-100 opacity-5"></div>
         */}{" "}
        <CourseList />
      </div>
    </div>
  );
}
