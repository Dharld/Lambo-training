import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCourses } from "../../../../store/slices/course/course.actions";
import { useToast } from "../../../../hooks/toast.hook";
import EmptyState from "../EmptyState/EmptyState";
import Button from "../../../../components/Button/Button";

export default function Home() {
  const courses = useSelector((state) => state.course.courses);
  const { showError, showSuccess } = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCourses()).then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
      console.log(res);
    });
  }, []);
  return (
    <div className="container mx-auto py-4 flex-1">
      <div className="flex justify-between">
        <h1 className="text-slate-500 font-bold text-2xl">Home</h1>
        <div className="flex-1"></div>
        <Button fit={true} styles="cursor-pointer">
          Add Course
        </Button>
      </div>
      <div className="w-full h-full grid place-items-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-700 to-sky-100 opacity-5"></div>
        {courses.length === 0 ? (
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
