import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";

import CourseList from "../../../../components/CourseList/CourseList";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/toast.hook";
import { useCourses } from "../../../../hooks/courses.hook";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const { showError } = useToast();
  const { getAllCourses } = useCourses();

  useEffect(() => {
    setLoading(true);
    getAllCourses().then((res) => {
      if (res.error) {
        showError(res.error.message);
      } else {
        setCourses(res.payload);
      }
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("../courses/draft");
  };

  return (
    <div className="px-8 max-w-[1200px] container mx-auto mt-8 flex-1">
      <div className="flex justify-between pb-2 relative z-10">
        <h1 className="text-gray-500 font-bold text-2xl">My Courses</h1>
        <div className="flex-1"></div>
        <Button fit={true} styles="cursor-pointer" handleClick={handleNavigate}>
          Add Course
        </Button>
      </div>
      <CourseList courses={courses} loading={loading} />
    </div>
  );
}
