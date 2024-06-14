/* eslint-disable react/prop-types */
export default function Chip({ text, styles, size = "medium" }) {
  const smallStyles = "text-sm px-4 py-1";
  const mediumStyles = "text-base px-4 py-2";

  return (
    <div
      className={`bg-violet-100 text-violet-400 rounded-full w-fit ${
        size === "small" ? smallStyles : mediumStyles
      } ${styles ? styles : ""}`}
    >
      {text}
    </div>
  );
}
