import Courses from "../Courses/Courses";
import { useCourses } from "../../../../hooks/courses.hook";
import { useEffect } from "react";
import { useToast } from "../../../../hooks/toast.hook";
import { useSelector } from "react-redux";

export default function Catalog() {
  const filteredCourses = useSelector((state) => state.course.displayedCourses);
  const { getAllUserNonEnrolledCourses, loading } = useCourses();
  const { showError } = useToast();
  const user = useSelector((state) => state.auth.user);

  const id = user?.id;

  useEffect(() => {
    if (!id) return;
    getAllUserNonEnrolledCourses(id).then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
    });
  }, []);

  if (!id) return;

  return (
    <div className="mt-4 h-full">
      <Courses courses={filteredCourses} loading={loading} />
    </div>
  );
}
