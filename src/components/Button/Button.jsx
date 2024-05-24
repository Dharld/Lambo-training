/* eslint-disable react/prop-types */
export default function Button({ loading, children }) {
  return (
    <button
      type="submit"
      className="w-full mt-10 flex justify-center items-center"
    >
      {loading ? (
        <div className="spinner spinner-extra-small"></div>
      ) : (
        <div>{children}</div>
      )}
    </button>
  );
}
