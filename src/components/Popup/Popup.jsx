/* eslint-disable react/prop-types */
export default function Popup({ children, isOpen = false }) {
  return (
    <ul
      className={`absolute w-[200px] bg-white border border-slate-100 shadow-sm right-0 rounded-md z-[420] ${
        isOpen ? "slide-down" : "slide-up"
      }`}
    >
      {children}
    </ul>
  );
}
