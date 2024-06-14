import Button from "../../../../components/Button/Button";
import GoBack from "../GoBack/GoBack";
import BasicTab from "../BasicTab/BasicTab";
import PricingTab from "../PricingTab/PricingTab";
import { useState } from "react";
import { useToast } from "../../../../hooks/toast.hook";
import { useDispatch, useSelector } from "react-redux";
import { addCourse as addCourseAction } from "../../../../store/slices/course/course.actions";
import { useNavigate } from "react-router-dom";
import "./AddCourse.scss";

const INITIAL_STATE = {
  imageUrl: "",
  file: "",
  title: "",
  description: "",
  level: "Beginner",
  price: "",
};

export default function AddCourse() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const loadingCourse = useSelector((state) => state.course.loading);
  const { showError, showSuccess } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setActiveTabIndex(activeTabIndex + 1);
  };

  const handlePrevious = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setActiveTabIndex(activeTabIndex - 1);
  };

  const addCourse = () => {
    const { title, description, level, price } = formData;
    if (!title || !description || !level || !price) {
      showError("Enter all fields");
      return;
    }
    dispatch(addCourseAction(formData)).then((res) => {
      if (res.error) {
        showError("Failed to add course");
        return;
      } else {
        console.log(res.payload);
      }
      showSuccess("Course added successfully!");
      navigate("/admin/home");
    });
  };

  const tabs = [
    { title: "Basic Informations", index: 0 },
    { title: "Pricing", index: 1 },
    { title: "Course Content", index: 2 },
  ];
  return (
    <div className="h-full w-full grid-background flex-1 flex flex-col ">
      <div className="container mx-auto flex items-center justify-between px-4">
        <GoBack>
          <h1 className="text-xl text-slate-500 font-semibold group-hover:text-violet-500 transition-colors">
            Create Course
          </h1>
        </GoBack>
        <Button
          styles="px-8"
          fit={true}
          handleClick={addCourse}
          loading={loadingCourse}
          isDisabled={loadingCourse}
        >
          Publish Course
        </Button>
      </div>

      {/* <Tabs
        tabs={tabs}
        activeTab={activeTabIndex}
        setActiveTab={setActiveTabIndex}
      />
 */}
      <div className="bg-pattern flex-1 w-full py-4 overflow-auto flex flex-col">
        {activeTabIndex === 0 && (
          <BasicTab data={formData} onNext={handleNext} />
        )}
        {activeTabIndex === 1 && (
          <PricingTab
            data={formData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        {activeTabIndex === 2 && (
          <div className="w-full text-center py-4">
            Course Content Placeholder
          </div>
        )}
      </div>
    </div>
  );
}
