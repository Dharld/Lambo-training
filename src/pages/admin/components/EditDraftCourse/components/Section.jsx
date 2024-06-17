/* eslint-disable react/prop-types */
import { AiFillFile, AiOutlinePlus } from "react-icons/ai";
import Button from "../../../../../components/Button/Button";
import Lecture from "./Lecture";

export default function Section({ styles }) {
  return (
    <div className="section px-4 py-4 bg-gray-100 mt-4">
      <div className="flex items-center gap-2">
        <span className="font-bold text-base">Section 1: </span>
        <span className="flex items-center gap-1">
          <i>
            <AiFillFile />
          </i>{" "}
          <span>Introduction</span>
          <span className="text-sm underline cursor-pointer text-violet-500 hover:text-violet-400">
            Edit title
          </span>
        </span>
      </div>
      <div className={"section " + styles}>
        <Lecture />
        <Button
          fit={true}
          styles="mt-2 bg-transparent border border-violet-500 text-violet-500 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <AiOutlinePlus />
            Lecture
          </span>
        </Button>
      </div>
    </div>
  );
}
