/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Audience from "./components/Audience";
import Landing from "./components/Landing";
import Content from "./components/Content";
import { useState } from "react";
import { useData } from "../DataPovider/DataProvider";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../../../hooks/toast.hook";
import { CgSpinner } from "react-icons/cg";
import { useLanding } from "./components/LandingProvider";
import { setDraft } from "../../../../store/slices/course/course.actions";
import courseService from "../../../../services/courseService";

export default function EditDraftCourse() {
  const [activePage, setActivePage] = useState("audience");
  const [loading, setLoading] = useState(false);

  const { handleSaveAudience } = useData();
  const { handleSaveLanding } = useLanding();

  const draft = useSelector((state) => state.course.draft);

  console.log(draft);
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const save = async () => {
    if (activePage === "audience") {
      setLoading(true);
      handleSaveAudience()
        .then((res) => {
          if (res.error) {
            showError(res.error.message);
            return;
          }
          showSuccess("Audience details saved successfully");
          return;
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (activePage == "landing") {
      setLoading(true);
      handleSaveLanding()
        .then((res) => {
          if (res.success) {
            const newDraft = res.data;
            dispatch(
              setDraft({
                ...draft,
                title: newDraft.title,
                category_id: newDraft.category_id,
                audience: newDraft.audience,
                landing: newDraft.landing,
              })
            );
            showSuccess("Landing Page informations updated successfully");
            return;
          }
          showError(res.error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const publishCourse = () => {
    if (draft && draft.draft_id) {
      setLoading(true);
      courseService
        .publishCourse(draft.draft_id)
        .then((res) => {
          if (!res.success) {
            showError(res.error);
            return;
          }
          showSuccess("Course published successfully");
        })
        .finally(() => {
          setLoading(false);
          navigate("/admin/home");
        });
    } else {
      showError("There's currently no draft for this course");
      return;
    }
  };

  const MenuItem = ({ label, to }) => {
    const textStyle = `${to == activePage ? "text-violet-500" : ""}`;
    return (
      <div className="flex flex-1 items-center gap-1 mt-3 cursor-pointer group">
        <div
          className={`w-4 h-4 rounded-full border border-slate-500 ${
            to == activePage ? "bg-violet-500" : ""
          }`}
        >
          <div
            className={`${
              to == activePage ? "bg-violet-500" : ""
            } rounded-full w-3 h-3 flex-shrink-0 ml-[1px] mt-[1px]`}
          />
        </div>
        <div
          onClick={() => setActivePage(to)}
          className={"group-hover:underline " + textStyle}
        >
          {label}
        </div>
      </div>
    );
  };

  if (!draft) {
    navigate("/admin/home");
  }

  return (
    <div className="absolute top-0 left-0 w-full z-[2001] bg-slate-50 h-screen overflow-auto">
      <div className="sticky top-0 bg-zinc-900 flex justify-between items-center text-white px-4 py-3 z-[100]">
        <div className="flex gap-2 items-center">
          <NavLink
            className="flex gap-1 items-center cursor-pointer px-4 py-2 hover:bg-slate-50 hover:text-zinc-900 group rounded-full transition-all"
            to="/admin/home"
          >
            <AiOutlineArrowLeft />
            <span>Back to courses</span>
          </NavLink>
          <div className="font-bold underline">{draft.title}</div>
          <div className="bg-zinc-500 px-2 py-1 text-xs">DRAFT</div>
        </div>
        <Button fit={true} isDisabled={loading} handleClick={save}>
          {loading ? <CgSpinner className="spin" /> : "Save"}
        </Button>
      </div>
      <div className="flex gap-4 w-full max-w-[1000px] mx-auto py-8 text-sm relative">
        <ul className="font-semi-bold w-1/4 sticky top-24 h-fit">
          <li>
            <h4 className="font-bold">Plan your course</h4>
            <MenuItem label="Intended Learners" to="audience" />
          </li>
          <li className="mt-6">
            <h4 className="font-bold">Create your content</h4>
            <MenuItem label="Curriculum" to="content" />
          </li>
          <li className="mt-6">
            <h4 className="font-bold">Publish your course</h4>
            <MenuItem label="Course Landing Page" to="landing" />
          </li>

          <Button styles="mt-12" handleClick={publishCourse} loading={loading}>
            Publish Course
          </Button>
        </ul>
        <div className="flex-1">
          {activePage == "audience" && <Audience />}
          {activePage == "landing" && <Landing />}
          {activePage == "content" && <Content />}
          {/* <Outlet /> */}
        </div>
      </div>
    </div>
  );
}
