import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./toast.hook";
import { getUserCourses } from "../store/slices/course/course.actions";
import { useEffect } from "react";

export const useCourses = () => {
  const courses = useSelector((state) => state.course.courses);
  const { showError } = useToast();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.course.loading);

  useEffect(() => {
    dispatch(getUserCourses()).then((res) => {
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
