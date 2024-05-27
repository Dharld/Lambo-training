/* eslint-disable react/prop-types */
export default function Button({
  loading,
  children,
  handleClick,
  styles,
  isDisabled,
}) {
  return (
    <button
      type="submit"
      className={`w-full flex justify-center items-center ${styles}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {loading ? (
        <div className="spinner spinner-extra-small"></div>
      ) : (
        <div>{children}</div>
      )}
    </button>
  );
}
