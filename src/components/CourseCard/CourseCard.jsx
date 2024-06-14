import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Chip from "../Chip/Chip";

/* eslint-disable react/prop-types */
export default function CourseCard({ course, buttonLabel, handleAction }) {
  const publicUrl = import.meta.env.VITE_SUPABASE_IMAGE;
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 300); // Delay the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`opacity-0 bg-white rounded-md overflow-hidden border border-slate-100 transition-all cursor-pointer flex flex-col hover:shadow-md ${
        fadeIn ? "fade-in" : ""
      }`}
    >
      <div className="bg-slate-200 h-[150px] relative shrink-0">
        <img
          src={publicUrl + course.thumbnail_url}
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-2 flex flex-1 flex-col">
        <div className="text-2xl font-semibold text-slate-500 leading-6 mb-2">
          {course.title}
        </div>
        <Chip text={course.level} />
        <div className="flex-1"></div>
        <div className="text-2xl my-2 font-bold text-slate-500 text-right">
          ${course.price}
        </div>
        <div className="flex-1"></div>
        <div className="flex pb-2">
          {
            <Button
              type="button"
              styles="rounded-sm relative z-10"
              handleClick={handleAction}
            >
              {buttonLabel}
            </Button>
          }
        </div>
      </div>
    </div>
  );
}
