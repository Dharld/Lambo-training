/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai";

export default function Rating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-base text-yellow-600">{rating.toFixed(1)}</span>
      <div className={`flex w-[${(10 * rating) / 5}ch] overflow-hidden`}>
        {/** We'll use (10 * 4.7 / 5) */}
        <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch] border-red-50" />
        <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch]" />
        <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch]" />
        <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch]" />
        <AiFillStar className="flex-shrink-0 text-yellow-600 w-[2ch]" />
      </div>
      <span className="text-base ml-2">33,478 students</span>
    </div>
  );
}
