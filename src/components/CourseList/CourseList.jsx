import { useCourses } from "../../hooks/courses.hook";
import EmptyState from "../../pages/admin/components/EmptyState/EmptyState";
import CourseCard from "../CourseCard/CourseCard";
import Spinner from "../Spinner/Spinner";

export default function CourseList() {
  const { courses, loading } = useCourses();
  return (
    <div>
      {loading ? (
        <div className="w-full h-full grid justify-center mt">
          <Spinner styles="mt-48" />
        </div>
      ) : courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {courses.map((c, key) => (
            <CourseCard key={key} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
