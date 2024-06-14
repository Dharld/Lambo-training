export default function Searchbar() {
  return (
    <div className="bg-gray-50 flex gap-1 items-center px-4 py-4 max-w-[400px] w-full rounded-full mx-2 focus-within:ring-1 focus-within:ring-violet-400 focus-within:text-violet-400 text-slate-400">
      <i className="h-[24px] w-[24px] grid place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          className="fill-current"
        >
          <g id="_01_align_center" data-name="01 align center">
            <path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
          </g>
        </svg>
      </i>
      <input
        type="text"
        className="flex-1 bg-transparent border-none outline-none"
        placeholder="Enter the name of an admin, a course..."
      />
    </div>
  );
}
