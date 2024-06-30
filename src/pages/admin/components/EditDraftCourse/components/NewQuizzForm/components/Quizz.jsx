/* eslint-disable react/prop-types */
import {
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";

export default function Quizz({ title, page, goToPage, questions, deleteQuestion }) {
  console.log(questions);

  const goToPreviousPage = () => {
    goToPage(page - 1);
  };

  const goToNextPage = () => {
    goToPage(page + 1);
  };


  return (
    <div className="flex gap-3 mt-4">
      <div
        className="bg-slate-100 w-10 h-10 rounded-full grid place-items-center hover:bg-violet-100 cursor-pointer hover:text-violet-500"
        onClick={goToPreviousPage}
      >
        <AiOutlineArrowLeft />
      </div>
      <div className="flex-1">
        <h2 className="font-semibold text-xl">{title}</h2>
        <div
          className="text-sm bg-violet-50 text-violet-500 flex gap-2 items-center p-2 w-fit rounded-full hover:bg-violet-500 hover:text-white transition-colors cursor-pointer mt-1 relative"
          onClick={goToNextPage}
        >
          <AiOutlinePlus />
          <span>Create New Question</span>
        </div>
        <div className="h-[240px] w-full overflow-y-auto mt-4">
          {questions.map((q, index) => (
            <div
              className="bg-slate-50 w-full p-4 rounded-sm flex items-center"
              key={index}
            >
              <div>
                <div className="text-[1rem] font-semibold text-zinc-700">
                  {q.title}
                </div>
                <div className="text-violet-500 select-none hover:underline-offset-2 hover:underline cursor-pointer text-sm mt-1">
                  Show {q.options.length} options
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="border border-violet-500 p-4 rounded-sm text-violet-500 hover:bg-violet-500 hover:text-white transition-colors cursor-pointer" onClick={() => deleteQuestion(q.index)}>
                <AiOutlineDelete className="text-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
