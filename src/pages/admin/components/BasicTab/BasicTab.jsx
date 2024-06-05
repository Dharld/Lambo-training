/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useToast } from "../../../../hooks/toast.hook";
import Button from "../../../../components/Button/Button";
import ImageUploader from "../../../../components/ImageUploader/ImageUploader";
import Input from "../../../../components/Input/Input";
import Radio from "../../../../components/Radio/Radio";
import TextArea from "../../../../components/TextArea/TextArea";

export default function BasicTab({ data, onNext }) {
  const [formData, setFormData] = useState({
    imageUrl: data.imageUrl,
    file: data.file,
    title: data.title,
    description: data.description,
    level: data.level,
  });
  const { showError } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, file }));
  };

  const handlePreview = (url) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };
  const handleNext = () => {
    const { title, description, level } = formData;
    if (!title || !description || !level) {
      showError("Please fill in all fields");
      return;
    }
    onNext(formData);
  };
  /* 
  const uploadImageAction = async () => {
    try {
      const { file } = formData;
      if (!file) return;
      const name = file.name;
      await uploadImage(file, name);
      showSuccess("Image uploaded successfully");
    } catch (err) {
      console.error(err);
    }
  }; */

  return (
    <div className="max-w-[400px] mx-auto mt-6">
      <ImageUploader
        styles="mb-4"
        handleFileChange={handleFileChange}
        handlePreview={handlePreview}
        data={{ file: formData.file, imageUrl: formData.imageUrl }}
      />
      <Input
        value={formData.title}
        handleChange={handleChange}
        name="title"
        label="Title"
        placeholder="Enter the course title"
        styles={"mt-10"}
      />
      <TextArea
        value={formData.description}
        handleChange={handleChange}
        name="description"
        label="Description"
        placeholder="Write a small description of the course"
        styles={"mt-10"}
      />
      <div className="flex justify-between mt-4">
        <Radio
          name="level"
          label="Beginner"
          value="Beginner"
          handleChange={handleChange}
          checked={formData.level === "Beginner"}
        />
        <Radio
          name="level"
          label="Intermediate"
          value="Intermediate"
          handleChange={handleChange}
          checked={formData.level === "Intermediate"}
        />
        <Radio
          name="level"
          label="Advanced"
          value="Advanced"
          handleChange={handleChange}
          checked={formData.level === "Advanced"}
        />
      </div>
      <div className="flex gap-1">
        <Button styles="mt-12" handleClick={handleNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
}
