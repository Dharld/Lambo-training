import { AiFillFile, AiOutlinePlaySquare, AiOutlinePlus } from "react-icons/ai";
import Button from "../../../../../components/Button/Button";
import Lecture from "./Lecture";
import Section from "./Section";

export default function Content() {
  return (
    <div className="shadow p-8 text-sm">
      <h1 className="font-bold text-2xl">Intended Learners</h1>
      <p className="mt-2">
        Start putting together your course by creating sections, lectures and
        practice(quizzes, coding exercises and assigments).
      </p>

      <Section />
      <Section styles="mt-2" />
      <Section styles="mt-2" />
      <Section styles="mt-2" />
      <Button fit={true} styles="mt-4">
        <span className="flex items-center gap-2">
          <AiOutlinePlus />
          Section
        </span>
      </Button>
    </div>
  );
}
