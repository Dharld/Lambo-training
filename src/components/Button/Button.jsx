/* eslint-disable react/prop-types */
export default function Button({
  type = "button",
  loading,
  children,
  handleClick,
  styles,
  isDisabled,
  fit = false,
  icon = null,
  error = false,
}) {
  return (
    <button
      type={type}
      className={`${
        fit ? "w-fit" : "w-full"
      } flex justify-center items-center disabled:bg-sky-100 ${styles} ${
        error ? "bg-red-400" : ""
      }`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {loading ? (
        <div className="spinner spinner-extra-small"></div>
      ) : (
        <div className="flex items-center">
          <span>{children}</span>
          {icon}
        </div>
      )}
    </button>
  );
}
