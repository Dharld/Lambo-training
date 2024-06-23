/* eslint-disable react/prop-types */
import { AiOutlineSearch } from "react-icons/ai";

export default function Searchbar({ styles }) {
  return (
    <div
      className={
        "transition-all border border-slate-200 bg-gray-50 flex gap-1 items-center px-4 py-2 max-w-[400px] w-full rounded-sm mx-2 focus-within:ring-1 focus-within:ring-violet-400 focus-within:text-violet-400 text-slate-400 mr-4 " +
        styles
      }
    >
      <i className="h-[24px] w-[24px] grid place-items-center">
        <AiOutlineSearch className="font-bold" />
      </i>
      <input
        type="text"
        className="flex-1 bg-transparent border-none outline-none"
        placeholder="Search a course by name"
      />
    </div>
  );
}
