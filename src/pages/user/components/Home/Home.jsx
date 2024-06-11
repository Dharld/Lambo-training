import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Catalog from "../Catalog/Catalog";
import { filterCoursesByName } from "../../../../store/slices/course/course.actions";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCoursesByName(searchTerm));
  }, [searchTerm, dispatch]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  return (
    <div className="flex-1">
      <div className="bg-slate-100 h-[200px]  grid items-center">
        <div>
          <h1 className="mx-auto text-center mb-4 text-2xl font-bold text-gray-500">
            What do you wanna explore today ?
          </h1>
          <div className="w-full max-w-[600px] mx-auto bg-white rounded-sm focus-within:ring-1 focus-within:ring-sky-200">
            <input
              type="text"
              className="w-full  px-8 py-4 bg-transparent outline-none"
              placeholder="Enter the name of the course"
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1200px] h-full mx-auto p-8">
        <h1 className="font-semibold text-3xl text-gray-600">
          Explore our catalog of courses
        </h1>
        <Catalog />
      </div>
    </div>
  );
}
