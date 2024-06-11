import Courses from "../Courses/Courses";
import { useCourses } from "../../../../hooks/courses.hook";

export default function Catalog() {
  const { courses, loading } = useCourses();

  return (
    <div className="mt-4 h-full">
      <Courses courses={courses} loading={loading} />
    </div>
  );
}
