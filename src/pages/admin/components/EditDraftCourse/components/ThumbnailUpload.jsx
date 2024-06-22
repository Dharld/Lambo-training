/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Button from "../../../../../components/Button/Button";
import Modal from "./Modal/Modal"; // Ensure you have the correct path to the Modal component

const ThumbnailUpload = ({ courseThumbnailUrl, handleImageChange, file }) => {
  const thumbnailRef = useRef();
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (e) => {
    handleImageChange(e);
    e.target.value = null;
  };

  return (
    <div className="thumbnail">
      {showPreview && (
        <Modal
          imageUrl={courseThumbnailUrl.current}
          onClose={() => setShowPreview(false)}
        />
      )}
      <div className="font-medium text-xl my-4 text-slate-500">
        Thumbnail image
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 rounded-md overflow-hidden relative group cursor-pointer">
          <div
            className="absolute bg-black bg-opacity-50 w-full h-full opacity-0 group-hover:opacity-100 grid items-center text-center text-white transition-all font-semibold"
            onClick={() => setShowPreview(true)}
          >
            <div className="hover:underline">Show Preview</div>
          </div>
          <img src={courseThumbnailUrl.current} alt="" className="flex-1" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div>
            Upload your course Image here. It must follow the following
            guidelines: 750x442 pixels; .jpg, .jpeg or .png. No text on the
            image
          </div>
          <div className="w-full mt-4">
            <input
              type="file"
              className="hidden"
              accept=".jpg, .jpeg, .png"
              ref={thumbnailRef}
              onChange={handleFileChange}
            />
            <div className="flex items-center pl-4 bg-slate-100">
              <div className="flex-1">
                {file ? file.name : "No file selected"}
              </div>
              <Button
                fit={true}
                handleClick={() => thumbnailRef.current.click()}
              >
                Upload File
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailUpload;
