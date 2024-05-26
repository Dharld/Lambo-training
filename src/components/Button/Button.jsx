/* eslint-disable react/prop-types */
export default function Button({ loading, children, handleClick }) {
  return (
    <button
      type="submit"
      className="w-full mt-10 flex justify-center items-center"
      onClick={handleClick}
    >
      {loading ? (
        <div className="spinner spinner-extra-small"></div>
      ) : (
        <div>{children}</div>
      )}
    </button>
  );
}
