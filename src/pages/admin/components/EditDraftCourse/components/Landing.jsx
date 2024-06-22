/* eslint-disable react/prop-types */
import Input from "../../../../../components/Input/Input";
import TextArea from "../../../../../components/TextArea/TextArea";
import ImageCropper from "../../../../../components/ImageCropper/ImageCropper";
import ThumbnailUpload from "./ThumbnailUpload"; // Ensure you have the correct path to the ThumbnailUpload component
import { useLanding } from "./LandingProvider";
import Select from "../../../../../components/Select/Select";

const LEVELS = [
  {
    value: "Beginner",
    label: "Beginner",
  },
  {
    value: "Intermediate",
    label: "Intermediate",
  },
  {
    value: "Advanced",
    label: "Advanced",
  },
  {
    value: "All Levels",
    label: "All Levels",
  },
];

export default function Landing() {
  const {
    price,
    subtitle,
    title,
    description,
    level,
    openCropper,
    thumbnailPreview,
    thumbnailFile,
    courseThumbnailUrl,
    updateThumbnail,
    closeCropper,
    handleImageChange,
    handleChangeTitle,
    handleChangeSubtitle,
    handleChangePrice,
    handleChangeDescription,
    handleChangeLevel,
  } = useLanding();

  return (
    <div className="shadow p-8 text-sm relative">
      {openCropper && (
        <ImageCropper
          updateThumbnail={updateThumbnail}
          imageUrl={thumbnailPreview}
          onClose={closeCropper}
        />
      )}
      <h1 className="font-bold text-2xl">Course landing page</h1>
      <div className="mt-4">
        Your course landing page is crucial for your success. If it `&apos;`s
        well done, it not only captivates your audience but also converts
        browsers into active users. This is your first opportunity to make a
        strong impression—ensure it communicates the core values and benefits of
        your courses clearly and effectively.
      </div>
      <Input
        label="Course title"
        styles="mt-12"
        placeholder="Enter the course title"
        value={title}
        handleChange={handleChangeTitle}
      />
      <Input
        label="Course Subtitle"
        styles="mt-12"
        placeholder="Enter the course subtitle"
        value={subtitle}
        handleChange={handleChangeSubtitle}
      />
      <TextArea
        label="Course description"
        styles="mt-12"
        placeholder="Write a small description of the course"
        value={description}
        handleChange={handleChangeDescription}
      />
      <Input
        type="number"
        value={price}
        min={1}
        label="Course Price"
        styles="mt-12"
        placeholder="Enter the course price"
        handleChange={handleChangePrice}
      />

      <Select
        name="level"
        label="Level"
        data={LEVELS}
        styles="mt-4"
        idAttribute="value"
        labelAttribute="label"
        value={level}
        handleChange={handleChangeLevel}
      />
      <ThumbnailUpload
        file={thumbnailFile}
        courseThumbnailUrl={courseThumbnailUrl}
        handleImageChange={handleImageChange}
      />
    </div>
  );
}
