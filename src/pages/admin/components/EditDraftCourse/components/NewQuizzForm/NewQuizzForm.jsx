/* eslint-disable react/prop-types */
import { useState } from "react";
import GetTitle from "./components/GetTitle";
import Quizz from "./components/Quizz";
import CreateQuestion from "./components/CreateQuestion";
import { useToast } from "../../../../../../hooks/toast.hook";
import sectionService from "../../../../../../services/sectionService";

export default function NewQuizzForm({
  sectionId,
  onUpdateSection,
  onErrorUpload,
  onClose,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const saveQuizz = async () => {
    const quizz = {
      questions,
    };
    setLoading(true);
    try {
      const res = await sectionService.addQuizToSection(
        sectionId,
        title,
        quizz
      );
      if (!res.success) {
        showError(res.error);
        return;
      }
      onUpdateSection();
      onClose();
    } catch (err) {
      console.error(err);
      onErrorUpload && onErrorUpload(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const goToPage = (index) => {
    setCurrentPage(index);
    setData(null);
  };

  const goToPageWithData = (index, data) => {
    setCurrentPage(index);
    setData(data);
  };

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const editQuestion = (question) => {
    setQuestions(
      questions.map((q) => (q.index === question.index ? question : q))
    );
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
          goToPageWithData={goToPageWithData}
          deleteQuestion={deleteQuestion}
          saveQuizz={saveQuizz}
          loading={loading}
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
          editQuestion={editQuestion}
          questions={questions}
          data={data}
        />
      )}
    </div>
  );
}
