/* eslint-disable react/prop-types */
import {
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import Button from "../../../../../../../components/Button/Button";

export default function Quizz({
  title,
  page,
  goToPage,
  goToPageWithData,
  questions,
  deleteQuestion,
  saveQuizz,
  loading,
}) {
  const goToPreviousPage = () => {
    goToPage(page - 1);
  };

  const goToNextPage = () => {
    goToPage(page + 1);
  };

  return (
    <div className="h-full flex gap-3 mt-4">
      <div
        className="bg-slate-100 w-10 h-10 rounded-full grid place-items-center hover:bg-violet-100 cursor-pointer hover:text-violet-500"
        onClick={goToPreviousPage}
      >
        <AiOutlineArrowLeft />
      </div>
      <div className="flex-1 h-full flex flex-col">
        <h2 className="font-semibold text-xl">{title}</h2>
        <div
          className="text-sm bg-violet-50 text-violet-500 flex gap-2 items-center p-2 w-fit rounded-full hover:bg-violet-500 hover:text-white transition-colors cursor-pointer mt-1 relative"
          onClick={goToNextPage}
        >
          <AiOutlinePlus />
          <span>Create New Question</span>
        </div>
        <div className="flex-1 w-full overflow-y-auto mt-4 flex flex-col">
          <div className="h-[240px] flex flex-col">
            {questions.length ? (
              questions.map((q, index) => (
                <div
                  className="bg-slate-50 border-b border-b-violet-600 w-full py-4 px-6 rounded-sm flex items-center"
                  key={index}
                >
                  <div>
                    <div className="text-[1rem] font-semibold text-zinc-700">
                      {q.title}
                    </div>
                    <div
                      className="text-violet-500 select-none hover:underline-offset-2 hover:underline cursor-pointer text-sm mt-1"
                      onClick={() => {
                        goToPageWithData(page + 1, { question: q });
                      }}
                    >
                      Change Answers
                    </div>
                  </div>
                  <div className="flex-1"></div>
                  <div
                    className="border border-violet-500 p-4 rounded-sm text-violet-500 hover:bg-violet-500 hover:text-white transition-colors cursor-pointer"
                    onClick={() => deleteQuestion(q.index)}
                  >
                    <AiOutlineDelete className="text-xl" />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 w-full grid place-items-center bg-zinc-50 rounded-md">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-lg">There's no question yet</div>
                  <Button fit={true} styles="mt-2" handleClick={goToNextPage}>
                    Add Question
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Button
            styles="mt-2"
            handleClick={saveQuizz}
            loading={loading}
            isDisabled={loading}
          >
            Save Quizz
          </Button>
        </div>
      </div>
    </div>
  );
}
