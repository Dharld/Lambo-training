import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse as deleteCourseAction,
  getAllCourses as getAllCoursesAction,
  getAllUserEnrolledCourses as getAllUserEnrolledCoursesAction,
} from "../store/slices/course/course.actions";

export const useCourses = () => {
  const dispatch = useDispatch();

  const allCourses = useSelector((state) => state.course.courses);
  const courses = useSelector((state) => state.course.displayedCourses);
  const loadingCourses = useSelector((state) => state.course.loading);

  const getAllCourses = () => {
    return dispatch(getAllCoursesAction());
  };

  const getAllUserEnrolledCourses = (id) => {
    return dispatch(getAllUserEnrolledCoursesAction({ user_id: id }));
  };

  const deleteCourse = (course) => {
    const courseId = course.course_id;
    return dispatch(deleteCourseAction(courseId));
  };

  return {
    allCourses,
    courses,
    loadingCourses,
    deleteCourse,
    getAllCourses,
    getAllUserEnrolledCourses,
  };
};
