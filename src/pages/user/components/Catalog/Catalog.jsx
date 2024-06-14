import Courses from "../Courses/Courses";
import { useCourses } from "../../../../hooks/courses.hook";
import { useEffect } from "react";
import { useToast } from "../../../../hooks/toast.hook";
import { useSelector } from "react-redux";

export default function Catalog() {
  const filteredCourses = useSelector((state) => state.course.displayedCourses);
  const { getAllCourses, loading } = useCourses();
  const { showError } = useToast();

  useEffect(() => {
    getAllCourses().then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
    });
  }, []);

  return (
    <div className="mt-4 h-full">
      <Courses courses={filteredCourses} loading={loading} />
    </div>
  );
}
