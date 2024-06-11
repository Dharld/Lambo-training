import { useCourses } from "../../../../hooks/courses.hook";

export default function Courses() {
  const { courses } = useCourses();
  console.log(courses);
  return <div>Courses</div>;
}
