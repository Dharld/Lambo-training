import { useDispatch, useSelector } from "react-redux";
import Courses from "../Courses/Courses";
import Filter from "../Filter/Filter";
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../../store/slices/course/course.actions";
import { useToast } from "../../../../hooks/toast.hook";

export default function Catalog() {
  const [courses, setCourses] = useState([]);
  const loading = useSelector((state) => state.course.loading);
  const { showError } = useToast();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses()).then((res) => {
      if (!res.payload.success) {
        showError(res.payload.error);
        return;
      } else {
        setCourses(res.payload.data);
      }
    });
  }, []);

  return (
    <div className="flex gap-2 mt-4 h-full">
      <Courses courses={courses} loading={loading} />
      <Filter />
    </div>
  );
}
