import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Logo from "../../../../components/Logo/Logo";
import Select from "../../../../components/Select/Select";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../../../../hooks/toast.hook";
import { NavLink, useNavigate } from "react-router-dom";
import "./AddDraftCourse.scss";
import { createDraftCourse } from "../../../../store/slices/course/course.actions";

export default function AddDraftCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { showError } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { title, category_id } = formData;

    if (!title || !category_id) {
      showError("Please fill in all fields");
      return;
    }
    setLoading(true);
    dispatch(
      createDraftCourse({
        title: formData.title.trim(),
        category_id: formData.category_id,
      })
    ).then((res) => {
      if (res.error) {
        showError(res.error);
        setLoading(false);
      }
      const { course_id } = res.payload;
      navigate(`${course_id}/edit`);
      setLoading(false);
    });
  };

  const categories = [
    { id: 0, category_id: "Computer Science" },
    { id: 1, category_id: "Nursing" },
    { id: 2, category_id: "Human Resource" },
    { id: 3, category_id: "Finance" },
  ];

  return (
    <div className="w-full absolute top-0 left-0 bg-gray-50 z-50 h-screen">
      <div className="p-4 bg-white flex justify-between items-center">
        <Logo />
        <NavLink
          to="/admin/home"
          className="text-violet-500 font-semibold hover:underline cl"
        >
          Exit
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto mt-20">
        <div className="flex flex-col">
          <Input
            value={formData.title}
            name="title"
            label="Title"
            placeholder="Enter a title for your course"
            handleChange={handleChange}
          />
          <Select
            value={formData.category}
            name="category_id"
            label="Category"
            data={categories}
            styles="mt-4"
            idAttribute="id"
            labelAttribute="category_id"
            handleChange={handleChange}
          />
        </div>
      </form>
      <div className="w-full absolute bottom-0 p-4 flex justify-between bg-white">
        <div className="flex-1"></div>
        <Button
          loading={loading}
          type="submit"
          fit={true}
          handleClick={handleSubmit}
        >
          Create A New Course
        </Button>
      </div>
    </div>
  );
}
