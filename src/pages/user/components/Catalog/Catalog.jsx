import Button from "../../../../components/Button/Button";
import { AiOutlineArrowRight, AiOutlinePlayCircle } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { useCourses } from "../../../../hooks/courses.hook";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../../../components/Spinner/Spinner";
import { useToast } from "../../../../hooks/toast.hook";
import { useNavigate } from "react-router-dom";

export default function Catalog() {
  const { courses, loadingCourses, getAllUserEnrolledCourses } = useCourses();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const { showError } = useToast();

  useEffect(() => {
    console.log(courses);
  }, []);

  useEffect(() => {
    if (user) {
      getAllUserEnrolledCourses(user.id).then((res) => {
        if (res.error) {
          showError(res.error.message);
          return;
        }
      });
    }
  }, []);

  const goToDetailPage = (course_id) => {
    navigate("courses/" + course_id);
  };

  if (loadingCourses) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto h-screen grid grid-cols-3">
      <div className="col-span-1 bg-white p-8">
        <h1 className="flex gap-2 items-center w-fit py-2text-gray-700 text-xl font-semibold">
          <div className="bg-gray-50 grid place-items-center p-3 rounded-full">
            <AiOutlinePlayCircle className="text-zinc-800" />
          </div>
          <span>Continue to Learn</span>
        </h1>
        <ul className="mt-4">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white flex flex-col h-[50vh] rounded-sm overflow-hidden relative"
            >
              <div className="aspect-w-16 aspect-h-9 bg-slate-200 relative overflow-hidden">
                <img
                  src={decodeURIComponent(course.thumbnail_url)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-2 py-2">
                <div className="flex text-zinc-400 ">
                  <span className="text-xs font-bold flex-1 items-baseline tracking-wider">
                    COURSE
                  </span>
                  <FaRegBookmark className="text-xl cursor-pointer hover:fill-violet-500 transition-colors" />
                </div>
                <h2 className="text-xl font-semibold mt-1">{course.title}</h2>
                <div className="flex justify-between items-center mt-8">
                  <div>
                    <span className="text-zinc-500 text-xs">
                      {course.completion_percentage}%
                    </span>
                    <div className="bg-gray-100 rounded-full overflow-hidden w-[100px] h-[4px] relative flex">
                      <div
                        className={`shrink-0 bg-green-400  h-[4px]`}
                        style={{ width: course.completion_percentage + "px" }}
                      />
                    </div>
                  </div>
                  <Button
                    fit={true}
                    handleClick={() => goToDetailPage(course.course_id)}
                  >
                    <div className="flex items-center gap-1">
                      <span>Continue</span>
                      <AiOutlineArrowRight />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
