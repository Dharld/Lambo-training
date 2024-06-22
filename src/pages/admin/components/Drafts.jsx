/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCourses } from "../../../hooks/courses.hook";
import { setDraft } from "../../../store/slices/course/course.actions";
import { useToast } from "../../../hooks/toast.hook";
import Spinner from "../../../components/Spinner/Spinner";

const Draft = ({ draft, user, formatDate, actions }) => (
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
      {/* <Button styles="mt-2">Publish Course</Button> */}
    </div>
  </div>
);

export default function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAllDrafts } = useCourses();

  const { showError, showSuccess } = useToast();

  useEffect(() => {
    setLoading(true);
    getAllDrafts()
      .then((res) => {
        if (res.error) {
          showError(res.error);
          return;
        }
        setDrafts(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNavigate = (draft) => {
    const d = {
      ...draft,
    };
    dispatch(setDraft(d));
    navigate("/admin/courses/draft/edit");
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  if (!user || loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const EditDraftAction = ({ draft }) => (
    <div
      onClick={() => handleNavigate(draft)}
      className="bg-violet-50 hover:bg-violet-500 transition-colors p-3 rounded-full cursor-pointer group"
      title="Edit Draft"
    >
      <AiFillEdit
        className="text-base text-violet-500 group-hover:text-white"
        title="Edit Draft"
        xlinkTitle="Edit Draft"
      />
    </div>
  );

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <h1 className="font-semibold text-slate-600 text-xl my-6">
        Your previous drafts
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {drafts.map((d) => (
          <Draft
            key={d.draft_id}
            draft={d}
            user={user}
            formatDate={formatDate}
            actions={<EditDraftAction draft={d} />}
          />
        ))}
      </div>
    </div>
  );
}
