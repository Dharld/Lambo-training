/* eslint-disable react/prop-types */
import {
  AiFillCheckSquare,
  AiFillCloseCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { ANSWER_CORRECT_STATUS } from "../../../../../../../utils/constants";
import { useState } from "react";

export default function Answer({
  index,
  removeAnswer,
  toggleStatus,
  value,
  handleOptionChange,
  status = ANSWER_CORRECT_STATUS,
}) {
  const [correct, setCorrect] = useState(status === ANSWER_CORRECT_STATUS);

  const remove = () => {
    removeAnswer(index);
  };

  const toggle = () => {
    toggleStatus(index);
    setCorrect(!correct);
  };

  return (
    <div className="group my-2">
      {/* <div className="text-gray-500 font-medium group-focus-within:text-violet-500 group-focus-within:font-semibold transition-colors">
        Answer {index}
      </div> */}
      <div
        className={`bg-slate-50 border border-slate-100 group-focus-within:border-violet-300 rounded-sm flex items-center mt-2 px-2 $`}
      >
        {correct ? (
          <AiFillCheckSquare className="text-xl text-green-500" />
        ) : (
          <AiFillCloseCircle className="text-xl text-red-500" />
        )}
        <input
          type="text"
          className="outline-none bg-transparent px-2 py-4 flex-1"
          placeholder="Enter the option"
          onChange={(e) => handleOptionChange(index, e)}
          value={value}
        />
        <div className="flex items-center gap-2 h-full">
          <span
            className="text-violet-500 hover:underline cursor-pointer"
            onClick={toggle}
          >
            {`Mark ${correct ? "Incorrect" : "Correct"}`}
          </span>
          <div
            className="px-2 py-2 border border-violet-500 text-violet-500 grid place-items-center cursor-pointer hover:bg-violet-500 hover:text-white transition-colors rounded-sm"
            onClick={remove}
          >
            <AiOutlineDelete size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
