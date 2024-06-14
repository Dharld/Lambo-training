import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Catalog from "../Catalog/Catalog";
import { filterCoursesByName } from "../../../../store/slices/course/course.actions";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const searchBarRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCoursesByName(searchTerm));
  }, [searchTerm, dispatch]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleScroll = () => {
    if (searchBarRef.current) {
      const { top } = searchBarRef.current.getBoundingClientRect();
      setIsSticky(top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex-1 h-screen overflow-auto bg-gray-50">
      {/*   <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-24 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Explore Courses</h1>
      </div> */}
      <div
        ref={searchBarRef}
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
      <div className="w-full max-w-5xl h-full mx-auto py-8 px-4">
        <h1 className="font-semibold text-3xl text-gray-700 text-center mb-8">
          Explore our catalog of courses
        </h1>
        <Catalog />
      </div>
    </div>
  );
}
