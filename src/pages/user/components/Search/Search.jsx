/* eslint-disable react/prop-types */

import { forwardRef } from "react";

export default forwardRef(function Search(
  { isSticky, handleChange, searchTerm },
  ref
) {
  return (
    <div
      ref={ref}
      className={`w-full bg-white p-4 sticky top-0 z-50 transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 right-0 z-50" : ""
      }`}
    >
      <div className="max-w-xl mx-auto flex items-center bg-white rounded-full shadow-sm overflow-hidden border border-gray-200">
        <input
          type="text"
          className="w-full px-6 py-3 text-gray-700 focus:outline-none"
          placeholder="Enter the name of the course"
          onChange={handleChange}
          value={searchTerm}
        />
      </div>
    </div>
  );
});
