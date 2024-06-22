/* eslint-disable react/prop-types */
import { IoMdAdd } from "react-icons/io";
import Input from "../../../../../components/Input/Input";
import Button from "../../../../../components/Button/Button";
import { useData } from "../../DataPovider/DataProvider";

const AudienceSection = ({
  title,
  description,
  items,
  handleChange,
  addItem,
  removeItem,
  placeholder,
  k,
}) => {
  return (
    <div className="mt-4" key={k}>
      <h4 className="font-extrabold">{title}</h4>
      <p>{description}</p>
      {items.map((item) => (
        <div key={item.id}>
          <Input
            placeholder={placeholder}
            styles="mt-2"
            handleChange={(e) => handleChange(item.id, e)}
            value={item.text}
          />
          <div
            className="underline text-violet-500 hover:text-violet-400 cursor-pointer"
            onClick={() => removeItem(item.id)}
          >
            Remove{" "}
          </div>
        </div>
      ))}
      <Button
        fit={true}
        icon={<IoMdAdd />}
        styles="mt-4 bg-transparent text-violet-500 hover:text-white rounded-full"
        front={true}
        handleClick={addItem}
      >
        <span>Add more to your response</span>
      </Button>
    </div>
  );
};

export default function Audience() {
  const {
    objectives,
    handleObjectiveChange,
    addObjective,
    removeObjective,
    requirements,
    handleRequirementChange,
    addRequirement,
    removeRequirement,
    targets,
    handleTargetChange,
    removeTarget,
    addTarget,
  } = useData();

  return (
    <div className="shadow p-8">
      <h1 className="font-bold text-2xl">Intended Learners</h1>
      <p className="mt-2">
        The following will be publicly displayed on your Course Landing Page and
        will have a direct impact on your course performance. These descriptions
        will help learners decide if your course is right for them.
      </p>
      d
      <AudienceSection
        title="What will students learn in your course?"
        description="You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course."
        items={objectives}
        handleChange={handleObjectiveChange}
        addItem={addObjective}
        placeholder="Learning Objective: Understand the Key Roles and Responsibilities of a Project Manager"
        k={1}
        removeItem={removeObjective}
      />
      <AudienceSection
        title="What are the requirements or prerequisites for taking your course?"
        description="List the required skills, experience, tools, or equipment learners should have prior to taking your course. If there are no requirements, use this space as an opportunity to lower the barrier for beginners."
        items={requirements}
        handleChange={handleRequirementChange}
        addItem={addRequirement}
        placeholder="Prerequisite: Familiarity with Basic Project Management Concepts"
        k={2}
        removeItem={removeRequirement}
      />
      <AudienceSection
        title="Who is this course for?"
        description="Write a clear description of the intended learners for your course who will find your course content valuable this will help you attract the right learners to your course"
        items={targets}
        handleChange={handleTargetChange}
        addItem={addTarget}
        placeholder="Example: Define the roles and responsibilities of a project manager"
        k={3}
        removeItem={removeTarget}
      />
    </div>
  );
}
