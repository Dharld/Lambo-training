/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../../../../../components/Button/Button";
import {
  AiFillCheckSquare,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { useToast } from "../../../../../hooks/toast.hook";
import supabase from "../../../../../utils/connectSupabase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCourses } from "../../../../../hooks/courses.hook";

export default function Quizz({ item, updateCourseProgress }) {
  console.log(item);

  const params = useParams();
  const courseId = params.courseId;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [numberOfCorrectUserAnswers, setNumberOfCorrectUserAnswers] =
    useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [show, setShow] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const { getCourseDetails } = useCourses();
  const user = useSelector((state) => state.auth.user);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    const itemQuestions = item.details.questions.map((q) => ({
      ...q,
      options: q.options.map((o) => ({ ...o, selected: false })),
    }));
    const correctAnswers = itemQuestions.map((question) =>
      question.options.filter((o) => o.status === "CORRECT")
    );
    setShow(false);
    setShowCorrectAnswers(false);
    setQuestions(itemQuestions);
    setCurrentQuestion(itemQuestions[0]);
    setNumberOfCorrectAnswers(correctAnswers.flat().length);
  }, [item.details]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => {
      const nextIndex = prev.index + 1;
      return questions.find((q) => q.index === nextIndex) || prev;
    });
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => {
      const prevIndex = prev.index - 1;
      return questions.find((q) => q.index === prevIndex) || prev;
    });
  };

  const handleOptionToggle = (optionIndex) => {
    const updatedOptions = currentQuestion.options.map((o, index) =>
      index === optionIndex ? { ...o, selected: !o.selected } : o
    );
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.index === currentQuestion.index
          ? { ...q, options: updatedOptions }
          : q
      )
    );
    setCurrentQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleQuizSubmission = async () => {
    if (item.is_completed) {
      /** Reset the Quiz */
    }
    const userAnswers = questions.map((question) =>
      question.options.filter((o) => o.selected)
    );
    if (userAnswers.some((answer) => answer.length === 0)) {
      showError("Please answer all questions before submitting");
      return;
    }
    const userCorrectAnswers = userAnswers
      .flat()
      .filter((o) => o.status === "CORRECT").length;

    if (userCorrectAnswers !== numberOfCorrectAnswers) {
      showError("You must answer all questions correctly to submit the quiz");
      return;
    }

    setNumberOfCorrectUserAnswers(userCorrectAnswers);
    setShow(true);

    // Update the completion status
    try {
      setLoadingUpload(true);
      const { data } = await supabase
        .from("UserProgress")
        .select("*")
        .eq("item_id", item.item_id)
        .eq("user_id", user.id);

      if (data.length === 0) {
        await supabase.from("UserProgress").insert({
          course_id: courseId,
          user_id: user.id,
          item_id: item.item_id,
          is_completed: true,
        });
      } else {
        await supabase
          .from("UserProgress")
          .update({
            is_completed: !data[0].is_completed,
          })
          .eq("item_id", item.item_id)
          .eq("user_id", user.id);
      }

      await getCourseDetails(courseId, user.id).then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }
        updateCourseProgress();
      });
      showSuccess("Successfully updated completion status");
      setLoadingUpload(false);
    } catch (error) {
      showError("An error occurred while updating completion status");
      console.error(error);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow">
      <div className="text-lg font-semibold text-gray-800">
        <div>Quiz: {item.title}</div>
        <div className="text-sm text-gray-500">Correct: +1, Incorrect: -1</div>
      </div>
      <div>
        {show && (
          <div className="mt-4">
            <div className="text-lg text-gray-700">
              Your Score:{" "}
              <span className="font-bold text-violet-500">
                {numberOfCorrectUserAnswers}/{numberOfCorrectAnswers}
              </span>
            </div>
            <Button
              fit
              handleClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
            >
              {showCorrectAnswers ? "Hide" : "Show"} Answers
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4">
        {currentQuestion && (
          <div className="fade-in">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-700 mb-2">
                {currentQuestion.title}
              </div>
              {currentQuestion.options.map((o, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionToggle(index)}
                  className={`p-3 rounded-sm cursor-pointer flex items-center ${
                    o.selected ? "bg-violet-100" : "bg-white"
                  } hover:bg-violet-50 transition-colors mt-2`}
                >
                  <div
                    className={`w-4 h-4 mr-2 rounded-full border ${
                      o.selected ? "bg-violet-500" : "border-gray-400"
                    }`}
                  ></div>
                  {o.value}
                  {showCorrectAnswers && o.status === "CORRECT" && (
                    <AiFillCheckSquare className="ml-2 text-green-500" />
                  )}
                  {showCorrectAnswers && o.status !== "CORRECT" && (
                    <AiFillCheckSquare className="ml-2 text-red-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button
                icon={<AiOutlineArrowLeft />}
                handleClick={handlePrevQuestion}
                styles="bg-transparent text-violet-500 hover:bg-violet-100"
              >
                Previous
              </Button>
              <Button
                icon={<AiOutlineArrowRight />}
                handleClick={handleNextQuestion}
                styles="bg-transparent text-violet-500 hover:bg-violet-100"
              >
                Next
              </Button>
            </div>
            <Button
              fit
              styles="mt-4 bg-violet-500 hover:bg-violet-600 text-white"
              handleClick={handleQuizSubmission}
              disabled={loadingUpload}
            >
              {item.is_completed ? "Reset Quiz" : "Submit Qquiz"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
