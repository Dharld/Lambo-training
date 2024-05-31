import { useCourses } from "../../hooks/courses.hook";

export default function CourseList() {
  const { courses } = useCourses();
  return <div>CourseList</div>;
}
