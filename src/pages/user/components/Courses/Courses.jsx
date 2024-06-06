/* eslint-disable react/prop-types */
import Spinner from "../../../../components/Spinner/Spinner";
import CourseCard from "../../../../components/CourseCard/CourseCard";
import { useNavigate } from "react-router-dom";

export default function Courses({ courses, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="mx-auto mt-24">
        <Spinner />
      </div>
    );
  }

  const checkout = (e, course) => {
    navigate("checkout/" + course.course_id, {
      state: {
        course: course,
      },
    });
  };

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
      {courses.map((course) => (
        <div key={course.course_id}>
          <CourseCard
            course={course}
            isAdmin={false}
            handleAction={(e) => checkout(e, course)}
          />
        </div>
      ))}
    </div>
  );
}