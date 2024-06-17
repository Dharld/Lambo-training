import { IoMdAdd } from "react-icons/io";
import Input from "../../../../../components/Input/Input";
import Button from "../../../../../components/Button/Button";

export default function Audience() {
  return (
    <div className="shadow p-8">
      <h1 className="font-bold text-2xl">Intended Learners</h1>
      <p className="mt-2">
        The following will be publicly displayed on your Course Landing Page and
        will have a direct impact on your course performance. These descriptions
        will help learners decide if your course is right for them.
      </p>
      <div className="objectives mt-4">
        <h4 className="font-extrabold">
          What will students learn in your course?
        </h4>
        <p>
          You must enter at least 4 learning objectives or outcomes that
          learners can expect to achieve after completing your course.
        </p>
        <Input
          placeholder="Example: Define the roles and responsibilities of a project manager"
          styles="mt-2"
        />
        <Input
          placeholder="Example: Define the roles and responsibilities of a project manager"
          styles="mt-2"
        />
        <Input
          placeholder="Example: Define the roles and responsibilities of a project manager"
          styles="mt-2"
        />
        <Input
          placeholder="Example: Define the roles and responsibilities of a project manager"
          styles="mt-2"
        />
        <Button
          fit={true}
          icon={<IoMdAdd />}
          styles="mt-4  bg-transparent text-violet-500 hover:text-white rounded-full"
          front={true}
        >
          <span>Add more to your response</span>
        </Button>
      </div>

      <div className="requirements mt-4">
        <h4 className="font-extrabold">
          What are the requirements or prerequisites for taking your course?
        </h4>
        <p>
          List the required skills, experience, tools, or equipment learners
          should have prior to taking your course. If there are no requirements,
          use this space as an opportunity to lower the barrier for beginners.
        </p>
        <Input
          placeholder="Example: Define the roles and responsibilities of a project manager"
          styles="mt-2"
        />
        <Button
          fit={true}
          icon={<IoMdAdd />}
          styles="mt-4  bg-transparent text-violet-500 hover:text-white rounded-full"
          front={true}
        >
          <span>Add more to your response</span>
        </Button>
      </div>
      <div className="courses mt-4">
        <h4 className="font-extrabold mt-4">Who is this course for?</h4>
        <p>
          Write a clear description of the intended learners for your course who
          will find your course content valuable this will help you attract the
          right learners to your course
        </p>
        <Input
          placeholder="Example: Define the roles and responsibilities of a project manager"
          styles="mt-2"
        />
        <Button
          fit={true}
          icon={<IoMdAdd />}
          styles="mt-4  bg-transparent text-violet-500 hover:text-white rounded-full"
          front={true}
        >
          <span>Add more to your response</span>
        </Button>
      </div>
    </div>
  );
}
