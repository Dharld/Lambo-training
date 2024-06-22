import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Logo from "../../../../components/Logo/Logo";
import Select from "../../../../components/Select/Select";
import Spinner from "../../../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../../../../hooks/toast.hook";
import { NavLink, useNavigate } from "react-router-dom";
import { createDraftCourse } from "../../../../store/slices/course/course.actions";
import { useCourses } from "../../../../hooks/courses.hook";
import "./AddDraftCourse.scss";

export default function AddDraftCourse() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
  });

  const { getAllCategories } = useCourses();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError } = useToast();

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }
        console.log(res.data);
        setCategories(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      navigate(`/admin/courses/draft/edit`);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner />
      </div>
    );
  }

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
            labelAttribute="name"
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
