/* eslint-disable react/prop-types */
export default function Chip({ text, styles }) {
  return (
    <div
      className={`text-xs bg-sky-100 text-sky-400 px-4 py-2 rounded-full w-fit ${
        styles ? styles : ""
      }`}
    >
      {text}
    </div>
  );
}
