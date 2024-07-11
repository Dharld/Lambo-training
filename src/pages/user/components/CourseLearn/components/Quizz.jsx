/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../../../../../components/Button/Button";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Quizz({ item }) {
  const itemQuestions = [...item.details.questions].map((q) => {
    q.options = q.options.map((o) => ({ ...o, selected: false }));
    return q;
  });

  const [questions, setQuestions] = useState(itemQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const nextQuestion = () => {
    const nextIndex = currentQuestion.index + 1;
    const lastIndex = questions.reduce((maxIndex, current) => {
      return Math.max(maxIndex, current.index);
    }, -1);
    if (nextIndex <= lastIndex) {
      const q = questions.find((q) => q.index == nextIndex);
      setCurrentQuestion(q);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion.index > 1) {
      const q = questions.find((q) => q.index == currentQuestion.index - 1);
      setCurrentQuestion(q);
    }
  };

  const toggleOption = (option) => {
    const optionIndex = option.index;
    const newCurrentQuestionOptions = currentQuestion.options.map((o) => {
      if (o.index == optionIndex) {
        return { ...o, selected: !o.selected };
      }
      return o;
    });

    setCurrentQuestion((prev) => ({
      ...prev,
      options: newCurrentQuestionOptions,
    }));
    setQuestions((prev) =>
      prev.map((q) =>
        q.index === currentQuestion.index
          ? { ...q, options: newCurrentQuestionOptions }
          : q
      )
    );
  };

  const submitQuiz = () => {
    const userAnswers = questions.reduce((acc, question) => {
      const selectedOptions = question.options.filter((o) => o.selected);
      return [...acc, selectedOptions];
    }, []);
    const correctAnswers = questions.reduce((acc, question) => {
      const correctOptions = question.options.filter(
        (o) => o.status == "CORRECT"
      );
      return [...acc, correctOptions];
    }, []);
    correctAnswers.forEach((a) => {});
    console.log(correctAnswers);
    console.log(userAnswers);
  };
  return (
    <div>
      <div className="font-bold text-2xl text-violet-500">{item.title}</div>
      <div className="mt-4">
        {item.details.questions && (
          <div className="border rounded-lg">
            {
              <div key={currentQuestion.index} className="mt-2 first:mt-0 pt-4">
                <div className="px-8 mb-2">
                  Select at least <span className="font-bold">1 </span>
                  propositions
                </div>

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
                        onClick={() => toggleOption(o)}
                      >
                        <div
                          className={`w-4 h-4 border border-gray-500 rounded-sm opacity-1 group-hover:border-violet-500 transition-colors z-50 ${
                            o.selected ? "bg-violet-500" : "bg-transparent"
                          }`}
                        />
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
          <AiOutlineArrowLeft
            onClick={prevQuestion}
            className="bg-slate-50 cursor-pointer border border-transparent hover:border-violet-500 hover:text-violet-500 w-[40px] h-[40px] p-3 rounded-full transition-colors"
          />
          <span>
            <span className="font-semibold">{currentQuestion.index}</span> of{" "}
            <span className="font-semibold">{questions.length}</span>
          </span>
          <AiOutlineArrowRight
            onClick={nextQuestion}
            className="bg-slate-50 cursor-pointer border border-transparent hover:border-violet-500 hover:text-violet-500 w-[40px] h-[40px] p-3 rounded-full transition-colors"
          />
        </div>
        <Button fit={true} styles="mt-4" handleClick={submitQuiz}>
          Submit Quizz
        </Button>
      </div>
    </div>
  );
}
