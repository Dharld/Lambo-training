/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../../../../components/Button/Button";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Quizz({ item }) {
  const [questions, setQuestions] = useState(item.details.questions);
  const [currentQuestion, setCurrentQuestion] = useState(
    item.details.questions[0]
  );

  const nextQuestion = () => {
    if (currentQuestion.index < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion.index > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className=" slide-in">
      <div className="font-bold text-2xl text-violet-500">{item.title}</div>
      <div className="mt-4">
        {item.details.questions && (
          <div className="border rounded-lg">
            {
              <div key={currentQuestion.index} className="mt-2 first:mt-0 pt-4">
                <div className="font-bold text-lg text-gray-700 px-8 flex items-center">
                  <div className="bg-slate-900 w-[35px] h-[35px] grid place-items-center text-white mr-2 shrink-0">
                    {currentQuestion.index}
                  </div>
                  {currentQuestion.title}
                </div>
                <div className="mt-2">
                  {currentQuestion.options &&
                    currentQuestion.options.map((o) => (
                      <div
                        key={o.index}
                        className="group flex items-center gap-2 px-8 py-6 hover:bg-gray-100 cursor-pointer transition-colors border-b border-b-slate last:border-b-0"
                      >
                        <div className="w-4 h-4 border border-gray-500 rounded-full circle opacity-1 group-hover:bg-violet-500 transition-colors z-50" />
                        <div>{o.value}</div>
                      </div>
                    ))}
                </div>
              </div>
            }
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-3 items-center ">
          <AiOutlineArrowLeft className="bg-slate-50 cursor-pointer border border-transparent hover:border-violet-500 hover:text-violet-500 w-[40px] h-[40px] p-3 rounded-full transition-colors" />
          <span>
            {currentQuestion.index} of {questions.length}
          </span>
          <AiOutlineArrowRight className="bg-slate-50 cursor-pointer border border-transparent hover:border-violet-500 hover:text-violet-500 w-[40px] h-[40px] p-3 rounded-full transition-colors" />
        </div>
        <Button fit={true} styles="mt-4">
          Submit Quizz
        </Button>
      </div>
    </div>
  );
}
