import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Catalog from "../Catalog/Catalog";
import { filterCoursesByName } from "../../../../store/slices/course/course.actions";
import Search from "../Search/Search";

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
      <Search
        ref={searchBarRef}
        isSticky={isSticky}
        handleChange={handleChange}
        searchTerm={searchTerm}
      />
      <div className="w-full max-w-5xl h-full mx-auto py-8 px-4">
        <h1 className="font-semibold text-3xl text-gray-700 text-center mb-8">
          Explore our catalog of courses
        </h1>
        <Catalog />
      </div>
    </div>
  );
}
