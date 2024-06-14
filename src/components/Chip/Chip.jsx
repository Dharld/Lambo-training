/* eslint-disable react/prop-types */
export default function Chip({ text, styles }) {
  return (
    <div
      className={`text-base bg-violet-100 text-violet-400 px-4 py-2 rounded-full w-fit ${
        styles ? styles : ""
      }`}
    >
      {text}
    </div>
  );
}
