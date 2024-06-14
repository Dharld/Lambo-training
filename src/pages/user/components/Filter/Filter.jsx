import { useState, useEffect } from "react";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import { useDispatch } from "react-redux";
import { filterCoursesByLevel } from "../../../../store/slices/course/course.actions";

export default function Filter() {
  const [creds, setCreds] = useState({
    levels: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterCoursesByLevel(creds.levels));
  }, [creds.levels, dispatch]);

  const handleChange = (e) => {
    const { value, checked } = e.target;

    setCreds((prevCreds) => {
      if (checked) {
        return {
          ...prevCreds,
          levels: [...prevCreds.levels, value],
        };
      } else {
        return {
          ...prevCreds,
          levels: prevCreds.levels.filter((level) => level !== value),
        };
      }
    });
  };

  return (
    <div className="w-full py-4 px-6  bg-gray-100 shadow-sm  text-gray-600 rounded-sm h-fit mb-4">
      <h3 className="font-bold text-slate-600">Filter By:</h3>
      <div className="flex justify-between mt-2">
        <div>
          <Checkbox
            name="level"
            value="Beginner"
            label="Beginner"
            color="text-slate-600"
            handleChange={handleChange}
          />
        </div>
        <div>
          <Checkbox
            name="level"
            value="Intermediate"
            label="Intermediate"
            color="text-slate-600"
            handleChange={handleChange}
          />
        </div>
        <div>
          <Checkbox
            name="level"
            value="Advanced"
            label="Advanced"
            color="text-slate-600"
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
