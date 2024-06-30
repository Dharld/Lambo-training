/* eslint-disable react/prop-types */
import { useState } from "react";
import { useToast } from "../../../../../../../hooks/toast.hook";
import Button from "../../../../../../../components/Button/Button";
import Input from "../../../../../../../components/Input/Input";

export default function GetTitle({ title, handleTitle, page, goToPage }) {
  const [animateOut, setAnimateOut] = useState(false);

  const { showError } = useToast();

  const goToNextPage = () => {
    if (!title) {
      showError("Title is required");
      return;
    }
    setAnimateOut(true);
    setTimeout(() => {
      goToPage(page + 1);
    }, 300);
  };

  return (
    <div className={`opacity-0 ${animateOut ? "fade-out" : "fade-in"}`}>
      <Input
        label="Title"
        type="text"
        name="title"
        id="title"
        placeholder="Enter your title"
        value={title}
        handleChange={handleTitle}
        styles="mt-12"
      />
      <div className="flex gap-1 mt-3">
        <Button styles="bg-white border border-violet-500 text-violet-500">
          Cancel
        </Button>
        <Button styles="bg-violet-500 text-white" handleClick={goToNextPage}>
          Create
        </Button>
      </div>
    </div>
  );
}
