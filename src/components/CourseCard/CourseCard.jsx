import Button from "../Button/Button";
import Chip from "../Chip/Chip";

/* eslint-disable react/prop-types */
export default function CourseCard({ course, isAdmin = true, handleAction }) {
  const publicUrl = process.env.REACT_APP_SUPABASE_IMAGE;

  return (
    <div className="  bg-white rounded-md overflow-hidden border border-slate-100 transition-all cursor-pointer h-[325px] flex flex-col">
      <div className="bg-slate-200 h-[125px] relative shrink-0">
        <img
          src={publicUrl + course.thumbnail_url}
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-2 flex flex-1 flex-col">
        <div className="text-xl font-semibold text-slate-500 leading-6 mb-2">
          {course.title}
        </div>
        <Chip text={course.level} />
        <div className="flex-1"></div>
        <div className="text-2xl my-2 font-bold text-slate-500 text-right">
          ${course.price}
        </div>
        <div className="flex pb-2">
          {isAdmin ? (
            <Button
              type="button"
              styles="rounded-sm relative z-10"
              handleClick={handleAction}
            >
              Manage Course
            </Button>
          ) : (
            <Button
              type="button"
              styles="rounded-sm relative z-10"
              handleClick={handleAction}
            >
              Enroll Course
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
