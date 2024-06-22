/* eslint-disable react/prop-types */
import CourseCard from "../CourseCard/CourseCard";
import Spinner from "../Spinner/Spinner";

export default function CourseList({ courses, loading }) {
  if (loading) {
    return (
      <div className="w-full h-full grid justify-center mt">
        <Spinner styles="mt-48" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 container py-8 overflow-y-auto ">
      {courses.map((c, key) => (
        <CourseCard key={key} course={c} buttonLabel="Manage Course" />
      ))}
    </div>
  );
}
