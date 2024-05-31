import EmptyState from "../EmptyState/EmptyState";
import Button from "../../../../components/Button/Button";
import Spinner from "../../../../components/Spinner/Spinner";
import { useCourses } from "../../../../hooks/courses.hook";
import { useDispatch } from "react-redux";

export default function Home() {
  const { courses, loading } = useCourses();
  const navigate = useDispatch();

  const handleNavigate = () => {
    alert("Handling navigate");
    navigate("/add-course");
  };

  return (
    <div className="container mx-auto py-4 flex-1">
      <div className="flex justify-between border-b border-b-slate-100 pb-2 relative z-10">
        <h1 className="text-slate-500 font-bold text-2xl">My Courses</h1>
        <div className="flex-1"></div>
        <Button fit={true} styles="cursor-pointer" onClick={handleNavigate}>
          Add Course
        </Button>
      </div>
      <div className="w-full h-full grid">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-400 to-sky-100 opacity-5"></div>
        {loading ? (
          <div className="w-full h-full grid justify-center mt">
            <Spinner styles="mt-48" />
          </div>
        ) : courses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid">
            {courses.map((c, key) => (
              <div key={key}>{c.title}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
