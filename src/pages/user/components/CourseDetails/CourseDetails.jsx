/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../../../hooks/courses.hook";
import { useToast } from "../../../../hooks/toast.hook";
import Spinner from "../../../../components/Spinner/Spinner";
import Button from "../../../../components/Button/Button";
import {
  AiOutlineBook,
  AiOutlinePlayCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";

const CardSection = ({ s, order }) => {
  const [isShown, setIsShown] = useState(false);

  const toggleShow = () => {
    setIsShown(!isShown);
  };

  return (
    <div className="flex flex-col cursor-pointer" key={s.id}>
      <div className="bg-white hover:shadow pt-4 mt-4 rounded-sm">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="w-[35px] h-[35px] bg-slate-100 text-slate-00 grid place-items-center rounded-full mr-2 font-bold">
              {order + 1}
            </div>
            <div className="font-bold text-xl text-slate-900">{s.title}</div>
          </div>
          {/* <Button fit={true}>Continue Section</Button> */}
        </div>
        <Button
          styles="bg-gray-50 text-violet-500 font-semibold mt-2 hover:bg-gray-100 transition-colors"
          handleClick={toggleShow}
        >
          <div className="flex gap-2 items-center">
            {isShown && <IoIosArrowDown />}
            {!isShown && <IoIosArrowUp />}
            <span>{`${isShown ? "Hide" : "Show"}`} Chapter Details</span>
          </div>
        </Button>
        {isShown && (
          <div>
            {s.items &&
              s.items.map((i) => <CardCourse key={i.item_id} item={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};

const CardCourse = ({ item }) => {
  return (
    <div className="flex items-center gap-2 py-4 px-4 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="w-[25px] h-[25px] bg-violet-100 rounded-full grid place-items-center">
        {item.content_type === "Video" && (
          <AiOutlinePlayCircle className="text-violet-500" />
        )}
        {item.content_type === "PDF" && (
          <AiOutlineBook className="text-violet-500" />
        )}
        {item.content_type === "Quizz" && (
          <PiStudent className="text-violet-500" />
        )}
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-gray-900 text-sm">{item.title}</div>
      </div>
    </div>
  );
};

export default function CourseDetails() {
  const params = useParams();
  const courseId = params.courseId;
  const [course, setCourse] = useState(null);
  const [bullets, setBullets] = useState(0);
  const [loading, setLoading] = useState(false);

  const { showError } = useToast();

  const { getCourseDetails } = useCourses();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getCourseDetails(courseId)
      .then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }
        switch (res.data.level) {
          case "Beginner":
            setBullets(1);
            break;
          case "Intermediate":
            setBullets(2);
            break;
          case "Advanced":
            setBullets(3);
            break;
          default:
            setBullets(0);
        }
        setCourse(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const goToLearnPage = () => {
    navigate("learn");
  };
  if (loading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner />
      </div>
    );
  }
  return (
    course && (
      <div className="flex gap-4 bg-slate-50 h-[100vh] overflow-auto">
        <div className="w-full h-full flex-1">
          <div className="bg-gray-900 text-white py-12">
            <div className="max-w-[1000px] mx-auto flex justify-between">
              <div className="flex flex-col">
                <div className="text-zinc-200 tracking-widest text-xs">
                  INTERACTIVE COURSE
                </div>
                <div className="text-4xl font-bold my-4">
                  {course.course_title}
                </div>
                <div className="flex gap-1  mt-3">
                  <div className="border border-white w-fit px-2 py-1 flex items-center gap-1">
                    <AiOutlineUser />
                    <span>
                      Instructor:{" "}
                      <span className="font-bold">{course.author_name}</span>
                    </span>
                  </div>
                  <div className="border border-white text-white w-fit px-2 py-1 gap-1 flex items-center">
                    <FaUsers />
                    <span className="font-bold">15.000 Participants</span>
                  </div>
                </div>
                <div className="flex items-center mt-6">
                  {new Array(bullets).fill(0).map((b) => {
                    return (
                      <div
                        className="flex-shrink-0 w-[6px] h-[6px] bg-violet-500 rounded-full mr-2"
                        key={b}
                      />
                    );
                  })}
                  <span>{course.level}</span>
                </div>
                <Button fit={true} styles="mt-4" handleClick={goToLearnPage}>
                  Continue Course
                </Button>
              </div>
              <img
                className="w-[300px] object-cover"
                src={course.thumbnail_url}
              />
            </div>
          </div>
          <div className="mt-4 max-w-[1000px] mx-auto">
            <div className="font-bold text-zinc-900">Course Description</div>
            <div>
              {course.course_description.length > 200
                ? course.course_description.slice(0, 200) + "..."
                : course.course_description}
              {course.course_description.length < 200 && (
                <span className="ml-1 underline text-gray-500 hover:text-violet-500 cursor-pointer">
                  Read More
                </span>
              )}
            </div>
            {course.sections &&
              course.sections.length > 0 &&
              course.sections.map((s, order) => (
                <CardSection key={s.id} order={order} s={s} />
              ))}
          </div>
        </div>
      </div>
    )
  );
}
