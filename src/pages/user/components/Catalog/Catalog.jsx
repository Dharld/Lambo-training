import Button from "../../../../components/Button/Button"; // Importing Button component
import { AiOutlineArrowRight, AiOutlinePlayCircle } from "react-icons/ai"; // Importing specific icons from react-icons library
import { FaRegBookmark } from "react-icons/fa"; // Importing specific icon from react-icons library
import { useCourses } from "../../../../hooks/courses.hook"; // Importing custom hook for courses
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux for accessing Redux state
import { useEffect } from "react"; // Importing useEffect hook from React
import Spinner from "../../../../components/Spinner/Spinner"; // Importing Spinner component
import { useToast } from "../../../../hooks/toast.hook"; // Importing custom hook for toast notifications
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for navigation

export default function Catalog() {
  const { courses, loadingCourses, getAllUserEnrolledCourses } = useCourses(); // Destructuring values from useCourses hook
  const user = useSelector((state) => state.auth.user); // Accessing user from Redux state
  const navigate = useNavigate(); // Initializing useNavigate hook

  const { showError } = useToast(); // Destructuring showError from useToast hook

  useEffect(() => {
    if (user) {
      // Check if user is defined
      getAllUserEnrolledCourses(user.id).then((res) => {
        // Fetch user enrolled courses
        if (res.error) {
          // If there's an error, show error toast
          showError(res.error.message);
          return;
        }
      });
    }
  }, []); // Empty dependency array to run this effect only once

  const goToDetailPage = (course_id) => {
    navigate("courses/" + course_id); // Navigate to course detail page
  };

  if (loadingCourses) {
    return (
      <div className="grid place-items-center w-full h-screen">
        <Spinner /> {/* Display spinner while courses are loading */}
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-[1200px] h-screen mx-auto -sm:grid-cols-1 grid-cols-2 lg:grid-cols-3">
      <div className="col-span-1 bg-white p-8">
        <h1 className="flex items-center gap-2 py-2 w-fit text-xl font-semibold text-gray-700">
          <div className="grid place-items-center p-3 bg-gray-50 rounded-full">
            <AiOutlinePlayCircle className="text-zinc-800" />{" "}
            {/* Play Circle Icon */}
          </div>
          <span>Continue to Learn</span> {/* Section title */}
        </h1>
        <ul className="mt-4">
          {courses.map(
            (
              course // Map over courses and render each course
            ) => (
              <div
                key={course.course_id}
                className="relative flex flex-col  bg-white rounded-sm"
              >
                <div className="relative overflow-hidden aspect-w-16 aspect-h-9 bg-slate-200">
                  <img
                    src={decodeURIComponent(course.thumbnail_url)}
                    className="object-cover w-full h-full" // Course thumbnail image
                  />
                </div>
                <div className="p-2">
                  <div className="flex text-zinc-400">
                    <span className="flex-1 text-xs font-bold tracking-wider">
                      COURSE
                    </span>
                    <FaRegBookmark className="text-xl cursor-pointer transition-colors hover:fill-violet-500" />{" "}
                    {/* Bookmark icon */}
                  </div>
                  <h2 className="mt-1 text-xl font-semibold">{course.title}</h2>{" "}
                  {/* Course title */}
                  <div className="flex gap-2 items-center justify-between mt-8">
                    <div>
                      <span className="text-xs text-zinc-500">
                        {course.completion_percentage}%{" "}
                        {/* Completion percentage */}
                      </span>
                      <div className="relative flex w-[100px] h-[4px] bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`shrink-0 bg-green-400 h-[4px]`}
                          style={{ width: course.completion_percentage + "px" }} // Progress bar
                        />
                      </div>
                    </div>
                    <Button
                      styles="p-2 text-sm"
                      fit={true}
                      handleClick={() => goToDetailPage(course.course_id)} // Button to navigate to course detail page
                    >
                      <div className="flex items-center gap-1">
                        <span>Continue</span>
                        <AiOutlineArrowRight /> {/* Arrow icon */}
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
