/* eslint-disable react/prop-types */
export default function Popup({ children, isOpen = false }) {
  return (
    <ul
      className={`absolute w-[200px] bg-white border border-slate-100 shadow-sm p-2 right-0 px-4 rounded-md z-40 ${
        isOpen ? "opacity-1" : "opacity-0"
      }`}
    >
      {children}
    </ul>
  );
}
