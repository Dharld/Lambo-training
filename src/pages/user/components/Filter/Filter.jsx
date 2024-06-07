import { useEffect, useState } from "react";
import Checkbox from "../../../../components/Checkbox/Checkbox";

export default function Filter() {
  const [creds, setCreds] = useState({
    levels: [],
  });

  const handleChange = (e) => {
    const { value, checked } = e.target;
    console.log(checked);

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
    <div className="w-[250px] py-4 px-6  bg-gray-50 shadow-sm  text-gray-900 rounded-sm h-fit">
      <h3 className="font-bold text-slate-600">Filter By:</h3>

      <div className="mb-4 mt-2">
        <Checkbox
          name="level"
          value="Beginner"
          label="Beginner"
          color="text-slate-600"
          handleChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Checkbox
          name="level"
          value="Intermediate"
          label="Intermediate"
          color="text-slate-600"
          handleChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Checkbox
          name="level"
          value="Advanced"
          label="Advanced"
          color="text-slate-600"
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}
