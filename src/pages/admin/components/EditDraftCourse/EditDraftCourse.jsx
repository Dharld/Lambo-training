/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { IoMdAdd } from "react-icons/io";
import Audience from "./components/Audience";
import Landing from "./components/Landing";
import Content from "./components/Content";

export default function EditDraftCourse() {
  const course = useSelector((state) => state.course.currentCourse);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  const MenuItem = ({ label }) => (
    <div className="flex flex-1 items-center gap-1 mt-3">
      <div className="w-4 h-4 rounded-full border"></div>
      <div>{label}</div>
    </div>
  );

  return (
    <div className="absolute top-0 left-0 w-full z-50 bg-slate-50 h-screen overflow-auto">
      <div className="sticky top-0 bg-zinc-900 flex justify-between items-center text-white px-4 py-3 z-[100]">
        <div className="flex gap-2 items-center">
          <div
            className="flex gap-1 items-center cursor-pointer px-4 py-2 hover:bg-slate-50 hover:text-zinc-900 group rounded-full transition-all"
            onClick={handleNavigate}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="fill-white group-hover:fill-zinc-900"
            >
              <g id="_01_align_center" data-name="01 align center">
                <path d="M19,11H9l3.293-3.293L10.879,6.293,6.586,10.586a2,2,0,0,0,0,2.828l4.293,4.293,1.414-1.414L9,13H19Z" />
              </g>
            </svg>
            <span>Back to courses</span>
          </div>
          <div className="font-bold underline">
            Learn Journaling for Beginners
          </div>
          <div className="bg-zinc-500 px-2 py-1 text-xs">DRAFT</div>
        </div>
        <Button fit={true}>Save</Button>
      </div>
      <div className="flex gap-4 w-full max-w-[1000px] mx-auto py-8 text-sm relative">
        <ul className="font-semi-bold w-1/4 sticky top-24 h-fit">
          <li>
            <h4 className="font-bold">Plan your course</h4>
            <MenuItem label="Intended Learners" />
          </li>
          <li className="mt-6">
            <h4 className="font-bold">Create your content</h4>
            <MenuItem label="Curriculum" />
          </li>
          <li className="mt-6">
            <h4 className="font-bold">Publish your course</h4>
            <MenuItem label="Course Landing Page" />
            <MenuItem label="Pricing" />
          </li>

          <MenuItem
            label="Publish your course"
            elements={["Course Landing Page", "Pricing"]}
            styles="mt-4"
          />
          <Button styles="mt-12">Publish Course</Button>
        </ul>
        <div className="flex-1">
          {/* <Audience /> */}
          {/* <Landing /> */}
          <Content />
          {/* <Outlet /> */}
        </div>
      </div>
    </div>
  );
}
