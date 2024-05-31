import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center  py-4 gap-2 group transition-colors cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <div className="flex items-center bg-slate-100 group-hover:bg-sky-500 px-2 py-2 rounded-full transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="fill-slate-400 group-hover:fill-white"
        >
          <g id="_01_align_center" data-name="01 align center">
            <path d="M19,11H9l3.293-3.293L10.879,6.293,6.586,10.586a2,2,0,0,0,0,2.828l4.293,4.293,1.414-1.414L9,13H19Z" />
          </g>
        </svg>
      </div>
      <h1 className="text-xl text-slate-500 font-semibold group-hover:text-sky-500 transition-colors">
        Create Course
      </h1>
    </div>
  );
}
