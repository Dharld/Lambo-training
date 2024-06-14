/* eslint-disable react/prop-types */
export default function Tab({ title, isActive, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`${
        !isActive
          ? "font-semibold relative"
          : "relative text-violet-500 after:bg-violet-500 after:content-[''] after:absolute after:w-full  after:h-1 after:-bottom-2 after:left-0"
      }`}
    >
      {title}
    </li>
  );
}
