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
      <div className="w-full h-full grid place-items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="h-full flex-1 max-w-[900px] mx-auto">
      <h1 className="text-3xl text-slate-500 font-bold my-6 container mx-auto">
        Your Courses
      </h1>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-2">
        {courses.map((c) => (
          <CourseCard
            course={c}
            isAdmin={false}
            handleAction={() => {}}
            key={c.course_id}
            showPrice={false}
            buttonLabel="Continue Learning"
          />
        ))}
      </div>
    </div>
  );
}
