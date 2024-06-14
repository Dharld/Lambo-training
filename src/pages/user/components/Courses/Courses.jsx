/* eslint-disable react/prop-types */
import Spinner from "../../../../components/Spinner/Spinner";
import CourseCard from "../../../../components/CourseCard/CourseCard";
import { useNavigate } from "react-router-dom";
// import Filter from "../Filter/Filter";

export default function Courses({ courses, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="mx-auto mt-24 flex justify-center">
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
    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-2">
      {courses.map((course) => (
        <CourseCard
          course={course}
          buttonLabel="Pay Now"
          handleAction={(e) => checkout(e, course)}
          key={course.course_id}
        />
      ))}
    </div>
  );
}
