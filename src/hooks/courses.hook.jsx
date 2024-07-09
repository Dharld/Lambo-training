import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse as deleteCourseAction,
  getAllCourses as getAllCoursesAction,
  getAllUserEnrolledCourses as getAllUserEnrolledCoursesAction,
  getAllUserNonEnrolledCourses as getAllUserNonEnrolledCoursesAction,
} from "../store/slices/course/course.actions";
import courseService from "../services/courseService";

export const useCourses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allCourses = useSelector((state) => state.course.courses);
  const courses = useSelector((state) => state.course.displayedCourses);
  const loadingCourses = useSelector((state) => state.course.loading);

  const id = user?.id;

  const getAllCategories = async () => {
    return courseService.getCategories();
  };

  const getAllDrafts = () => {
    return courseService.getAllDrafts(id);
  };
  const getAllCourses = () => {
    return dispatch(getAllCoursesAction());
  };

  const getAllUserEnrolledCourses = (id) => {
    return dispatch(getAllUserEnrolledCoursesAction({ user_id: id }));
  };

  const getAllUserNonEnrolledCourses = (id) => {
    return dispatch(getAllUserNonEnrolledCoursesAction({ user_id: id }));
  };

  const deleteCourse = (course) => {
    const courseId = course.course_id;
    return dispatch(deleteCourseAction(courseId));
  };

  const getCourseDetails = (courseId) => {
    return courseService.getCourseDetails(courseId);
  };

  return {
    allCourses,
    courses,
    loadingCourses,
    deleteCourse,
    getAllCourses,
    getAllUserEnrolledCourses,
    getAllUserNonEnrolledCourses,
    getAllCategories,
    getAllDrafts,
    getCourseDetails,
  };
};
