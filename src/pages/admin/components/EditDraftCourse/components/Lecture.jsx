import { AiOutlinePlaySquare } from "react-icons/ai";

export default function Lecture() {
  return (
    <div className="mt-2  bg-slate-50 border py-4 px-4 lecture">
      <div className="flex items-center gap-1">
        <span className="flex items-center gap-2">
          <span>Lecture 1: </span>
          <div className="flex items-center gap-1">
            <AiOutlinePlaySquare />
            <span>Introduction</span>
          </div>
        </span>
      </div>
    </div>
  );
}
