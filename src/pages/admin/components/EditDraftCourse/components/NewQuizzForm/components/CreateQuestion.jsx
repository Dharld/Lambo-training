/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useToast } from "../../../../../../../hooks/toast.hook";
import Input from "../../../../../../../components/Input/Input";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { FaRegKeyboard } from "react-icons/fa";
import { uid } from "uid";
import { v4 as uuidv4 } from "uuid";

import Answer from "./Answer";
import {
  ANSWER_CORRECT_STATUS,
  ANSWER_INCORRECT_STATUS,
} from "../../../../../../../utils/constants";
import Button from "../../../../../../../components/Button/Button";

export default function CreateQuestion({
  data,
  page,
  goToPage,
  questions,
  addQuestion,
  editQuestion,
}) {
  const question = data ? data.question : null;
  const [title, setTitle] = useState(question ? question.title : "");
  const [options, setOptions] = useState(question ? question.options : []);
  // const [numberOfCreatedQuestions, setNumberOfCreated ]

  const { showError } = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key == "n" && e.altKey) {
        // Check for 'Control' and 'N' using `e.code`
        addOption();
      }
    };

    // Attach the event listeners
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const generateUniqueString = () => {
    return Math.floor(performance.now() * 100) + "";
  };

  const addOption = () => {
    if (options.length >= 5) {
      showError("Maximum 5 options are allowed");
      return;
    }
    const newOption = {
      index: generateUniqueString(),
      value: "",
      status: ANSWER_INCORRECT_STATUS,
    };

    setOptions((prev) => [...prev, newOption]);
  };

  const handleOptionChange = (index, e) => {
    setOptions((prev) =>
      prev.map((o) => (o.index === index ? { ...o, value: e.target.value } : o))
    );
  };

  const toggleOptionStatus = (index) => {
    setOptions((prev) =>
      prev.map((o) =>
        o.index === index
          ? {
              ...o,
              status:
                o.status === ANSWER_CORRECT_STATUS
                  ? ANSWER_INCORRECT_STATUS
                  : ANSWER_CORRECT_STATUS,
            }
          : o
      )
    );
  };

  const removeOption = (index) => {
    setOptions((prev) => prev.filter((o) => o.index !== index));
  };

  const goToPreviousPage = () => {
    goToPage(page - 1);
  };

  const saveQuestion = () => {
    if (!title) {
      showError("Title is required");
      return;
    }
    if (options.length < 2) {
      showError("At least two options are required");
      return;
    }

    if (!question) {
      const newQuestion = {
        index: questions.length + 1,
        title,
        options,
      };
      addQuestion(newQuestion);
    } else {
      const updatedQuestion = {
        index: question.index,
        title,
        options,
      };
      editQuestion(updatedQuestion);
    }

    goToPreviousPage();
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full flex gap-3 mt-4">
        <div
          className="bg-slate-100 w-10 h-10 rounded-full grid place-items-center hover:bg-violet-100 cursor-pointer hover:text-violet-500"
          onClick={goToPreviousPage}
        >
          <AiOutlineArrowLeft />
        </div>
        <div className="flex flex-col flex-1">
          <Input
            label="Question"
            type="text"
            name="question"
            id="question"
            placeholder="Enter the question"
            value={title}
            handleChange={handleTitle}
          />
          <div
            className="text-sm bg-violet-50 text-violet-500 flex items-center px-4 py-2 w-fit rounded-full hover:bg-violet-500 hover:text-white transition-colors cursor-pointer mt-2"
            onClick={addOption}
          >
            <AiOutlinePlus />
            <span className="flex items-center gap-2">
              <span> Add Option</span>
              <span className="font-bold">(Alt + N)</span>
              <FaRegKeyboard />
            </span>
          </div>
          <div className="h-[220px] overflow-y-auto">
            <div className="mt-2">
              {options &&
                options.map((o) => (
                  <Answer
                    key={o.index}
                    index={o.index}
                    status={o.status}
                    removeAnswer={removeOption}
                    toggleStatus={toggleOptionStatus}
                    value={o.value}
                    handleOptionChange={handleOptionChange}
                  />
                ))}
            </div>
          </div>
          <Button
            styles="mt-[2rem] bg-transparent border border-violet-500 text-violet-500 hover:text-white"
            handleClick={saveQuestion}
          >
            {question ? "Update Question" : "Add Question"}
          </Button>
        </div>
      </div>
    </div>
  );
}
