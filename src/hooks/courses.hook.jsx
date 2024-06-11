import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./toast.hook";
import { getAllCourses } from "../store/slices/course/course.actions";
import { useEffect } from "react";

export const useCourses = () => {
  const { showError } = useToast();
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.course.displayedCourses);
  const loading = useSelector((state) => state.course.loading);

  useEffect(() => {
    dispatch(getAllCourses()).then((res) => {
      if (res.error) {
        showError(res.error.message);
        return;
      }
    });
  }, []);

  return {
    courses,
    loading,
  };
};
