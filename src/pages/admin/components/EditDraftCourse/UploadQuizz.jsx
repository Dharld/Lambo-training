/* eslint-disable react/prop-types */
import NewQuizzForm from "./components/NewQuizzForm/NewQuizzForm";

export default function UploadQuizz({
  sectionId,
  onUpdateSection,
  onErrorUpload,
  onClose,
}) {
  return (
    <div>
      <h2 className="font-bold text-xl">Create New Quizz</h2>
      <NewQuizzForm />
    </div>
  );
}
