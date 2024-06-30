import { useState } from "react";
import GetTitle from "./components/GetTitle";
import Quizz from "./components/Quizz";
import CreateQuestion from "./components/CreateQuestion";
import { useToast } from "../../../../../../hooks/toast.hook";

export default function NewQuizzForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const { showSuccess, showError } = useToast();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const goToPage = (index) => {
    setCurrentPage(index);
  };

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((q) => q.index !== index));
    showSuccess("Question deleted successfully!");
  };

  return (
    <div className="h-[400px] mx-auto overflow-hidden">
      {currentPage === 1 && (
        <GetTitle
          title={title}
          handleTitle={handleTitle}
          page={1}
          goToPage={goToPage}
        />
      )}
      {currentPage === 2 && (
        <Quizz
          title={title}
          page={2}
          goToPage={goToPage}
          deleteQuestion={deleteQuestion}
          questions={questions}
        />
      )}
      {currentPage === 3 && (
        <CreateQuestion
          title={title}
          handleTitle={handleTitle}
          page={3}
          goToPage={goToPage}
          addQuestion={addQuestion}
          questions={questions}
        />
      )}
    </div>
  );
}
