import { useEffect, useState } from "react";
import { useCourses } from "../../../../hooks/courses.hook";
import { useToast } from "../../../../hooks/toast.hook";
import Spinner from "../../../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import CourseCard from "../../../../components/CourseCard/CourseCard";

export default function Learn() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useSelector((state) => state.auth.user);

  const { showError } = useToast();

  const { getAllUserEnrolledCourses } = useCourses();

  useEffect(() => {
    setLoading(true);
    getAllUserEnrolledCourses(id).then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
      setCourses(res.payload);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full grid items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      {courses.map((c) => (
        <CourseCard
          course={c}
          isAdmin={false}
          handleAction={(e) => {}}
          key={c.course_id}
        />
      ))}
    </div>
  );
}
