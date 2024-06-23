import { AiFillStar, AiFillTrophy, AiOutlineCheckSquare } from "react-icons/ai";
import "./CoursePreview.scss";
import Button from "../../../../components/Button/Button";
import { IoInfiniteOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import courseService from "../../../../services/courseService";
import { useToast } from "../../../../hooks/toast.hook";
import Spinner from "../../../../components/Spinner/Spinner";
// import { useEffect, useRef } from "react";

export default function CoursePreview() {
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);

  const params = useParams();
  const courseId = params.courseId;

  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      courseService
        .getCourseDetails(courseId)
        .then((res) => {
          if (!res.success) {
            showError(res.error);
            return;
          }
          console.log(res.data);
          setCourse(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  if (loading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="bg-white top-[64px] left-0 w-full z-[1999]">
      <div className="right-menu rounded-sm overflow-hidden shadow">
        <img
          src={decodeURIComponent(course.thumbnail_url)}
          className="w-[348px] aspect-[16/9] mx-auto mt-[1px] bg-zinc-200 object-cover"
        />
        <div className="px-6 pt-4">
          <div className="text-slate-900 font-bold text-3xl">
            ${course.price}
          </div>
          <Button styles="mt-2">Add To Cart</Button>
          <Button styles="mt-2 bg-transparent border border-violet-500 text-violet-500 hover:text-white">
            Buy Now
          </Button>
          <div className="text-zinc-800">
            <h2 className="font-bold text-base mt-4 ">This course includes:</h2>
            <ul className="text-zinc-600 mt-2">
              <li className="flex items-center gap-4">
                <AiFillTrophy />
                <span>Certificate of Completion</span>
              </li>
              <li className="flex items-center gap-4 mt-2">
                <IoInfiniteOutline />
                <span>Fulltime access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-[50vh] bg-slate-900">
        <div className="my-container h-full text-white pt-8">
          {/* <div className="w-full bg-zinc-800 absolute top-0 left-0 py-2 px-6 font-bold slide-up">
            <div className="w-[1200px] mx-auto">
              Intro to Frontend Development
            </div>
          </div>
          <div className="w-full bg-zinc-800 fixed top-[64px] left-0 py-2 px-6 font-bold opacity-0">
            <div className="w-[1200px] mx-auto">
              Intro to Frontend Development
            </div>
          </div> */}
          <div className="left h-full flex flex-col pt-0 pb-6">
            <div className="bg-transparent border-l-2 border-l-violet-500 text-violet-500 select-none w-fit flex items-center justify-center  font-bold px-2 py-[2px] mb-6">
              {course.category_name}
            </div>
            <div className="text-4xl font-bold">{course.course_title}</div>
            <div className="text-slate-100 mt-2 text-xl">{course.subtitle}</div>
            <div className="mt-2">
              <div className="flex items-center gap-1">
                <span className="text-base text-yellow-600">4.7</span>
                <div className="flex w-[9.4ch] overflow-hidden">
                  {/** We'll use (10 * 4.7 / 5) */}
                  <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch] border-red-50" />
                  <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch]" />
                  <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch]" />
                  <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch]" />
                  <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch]" />
                </div>
                <span className="text-base ml-2">33,478 students</span>
              </div>
            </div>
            <div className="flex-1"></div>
            <div>
              Created by{" "}
              <span className="text-violet-500 hover:underline cursor-pointer">
                {course.author_name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-container">
        <div className="left">
          <section className="border px-6 py-4 mt-6">
            <h2 className="section-header">What you will learn</h2>
            <ul className="flex flex-col gap-2">
              {course.objectives.map((o) => (
                <li
                  className="flex items-start gap-2 leading-6"
                  key={o.objective_id}
                >
                  <span>
                    <AiOutlineCheckSquare className="text-violet-500" />
                  </span>
                  <span className="-mt-[4px]"> {o.objective_description}.</span>
                </li>
              ))}

              {/* <li className="flex items-start gap-2 leading-6">
                <span>
                  <AiOutlineCheckSquare className="text-violet-500" />
                </span>
                <span className="-mt-[4px]">
                  Learn to leverage the power of ChatGPT and add a powerful tool
                  in your Tech Stack.
                </span>
              </li>
              <li className="flex items-start gap-2 leading-6">
                <span>
                  <AiOutlineCheckSquare className="text-violet-500" />
                </span>
                <span className="-mt-[4px]">
                  Learn about Matplotlib and Seaborn - Two important Data
                  Visualization libraries in Python.
                </span>
              </li>
              <li className="flex items-start gap-2 leading-6">
                <span>
                  <AiOutlineCheckSquare className="text-violet-500" />
                </span>
                <span className="-mt-[4px]">
                  Build 3 complete Data Science and Machine Learning Projects in
                  a qucik and efficient way by using concepts covered in the
                  course and ChatGPT.
                </span>
              </li> */}
            </ul>
          </section>

          <section className="my-4">
            <h2 className="section-header">Requirements</h2>
            <ul className="text-gray-700">
              {course.requirements.map((r) => (
                <li key={r.requirement_id} className="flex my-3 gap-2">
                  <AiOutlineCheckSquare className="text-violet-500" />
                  <span className="-mt-[4px]">{r.requirement_description}</span>
                </li>
              ))}
              {/* <li>Basic knowledge of Python</li>
                <li>Basic knowledge of Machine Learning</li>
                <li>Basic knowledge of Data Science</li> */}
            </ul>
          </section>
          <div className="h-full w-[10px] bg-slate-900"></div>
          <section className="my-4">
            <h2 className="section-header">Who's this course for ?</h2>
            <ul className="text-gray-700">
              {course.targets.map((t) => (
                <li key={t.target_id} className="flex my-3 gap-2">
                  <AiOutlineCheckSquare className="text-violet-500" />
                  <span className="-mt-[4px]">{t.target_description}</span>
                </li>
              ))}
              {/* <li>Machine Learning Engineer</li>
                <li>Software Engineers</li> */}
            </ul>
          </section>

          <section>
            <h2 className="section-header">Description</h2>
            <p>
              {showMore
                ? course.course_description.slice(0, 400) + "..."
                : course.course_description}
              <span
                className="text-violet-500 cursor-pointer hover:underline"
                onClick={toggleShowMore}
              >
                {showMore ? "Read More" : "Show Less"}
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
