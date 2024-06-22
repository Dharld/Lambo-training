/* eslint-disable react/prop-types */
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import courseService from "../../../services/courseService";
import { useToast } from "../../../hooks/toast.hook";
import { AiFillEye } from "react-icons/ai";
import Spinner from "../../../components/Spinner/Spinner";

const Course = ({ draft, user, formatDate, actions }) => (
  <div
    className="bg-white flex flex-col h-[50vh] rounded-md overflow-hidden relative"
    key={draft.draft_id}
  >
    <div className="aspect-w-16 aspect-h-9 bg-slate-200 relative overflow-hidden">
      <img src={draft.thumbnail_url} className="w-full h-full object-cover" />
      <div className="absolute transition-colors cursor-pointer bg-white text-gray-600 text-xs font-bold w-fit h-fit px-2 py-1">
        {draft.Category.name}
      </div>
    </div>
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex">
        <div className="font-bold w-full text-xl leading-6 tracking-normal">
          {draft.title}
        </div>
        <div className="text-slate-400 text-sm font-semibold my-1 flex items-center justify-between">
          {formatDate(draft.created_at)}
        </div>
      </div>

      {draft.description && (
        <div className="text-gray-400 text-sm mt-1">
          {draft.description.slice(0, 60) + "..."}{" "}
          {/* <span className="underline text-violet-500 hover:text-violet-400 cursor-pointer">
                        Read more
                      </span> */}
        </div>
      )}
      <div className="flex-1"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
        <div>{user?.name}</div>
        <div className="mx-auto"></div>
        {actions}
      </div>
      {/* <Button styles="mt-2">Preview Course</Button> */}
    </div>
  </div>
);

export default function AuthorCourses() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const { showError, showSuccess } = useToast();

  const id = user.id;

  useEffect(() => {
    setLoading(true);
    courseService
      .getAllPublishedCourses(id)
      .then((res) => {
        if (!res.success) {
          showError(res.message);
          return;
        }
        console.log(res.data);
        setCourses(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  const PreviewCourseAction = () => {
    return (
      <div
        className="bg-violet-50 hover:bg-violet-500 transition-colors px-4 py-2 rounded-full cursor-pointer group flex items-center gap-2"
        title="Preview Course"
      >
        <AiFillEye
          className="text-base text-violet-500 group-hover:text-white"
          title="Edit Draft"
          xlinkTitle="Preview Course"
        />
        <span className="group-hover:text-white">Preview course</span>
      </div>
    );
  };

  if (!user || loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <h1 className="font-semibold text-slate-600 text-xl my-6">
        Your previous drafts
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {courses.map((d) => (
          <Course
            key={d.course_id}
            draft={d}
            user={user}
            formatDate={formatDate}
            actions={<PreviewCourseAction />}
          />
        ))}
      </div>
    </div>
  );
}
