/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import camera from "../../assets/images/camera.png";
import Button from "../Button/Button";

const UploadIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    className="fill-white"
  >
    <g id="_01_align_center" data-name="01 align center">
      <path d="M22,16v5a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V16H0v5a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V16Z" />
      <path d="M11.967,0A2.993,2.993,0,0,0,9.845.874L5.926,4.793,7.34,6.207l3.634-3.633L11,19l2,0L12.974,2.588l3.619,3.619,1.414-1.414L14.088.874A2.991,2.991,0,0,0,11.967,0Z" />
    </g>
  </svg>
);

export default function ImageUploader({
  data,
  styles,
  handleFileChange,
  handlePreview,
}) {
  const [selectedImage, setSelectedImage] = useState(data.file);
  const [previewUrl, setPreviewUrl] = useState(data.imageUrl);

  useEffect(() => {
    if (selectedImage) {
      handleFileChange(selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (previewUrl) {
      handlePreview(previewUrl);
    }
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`bg-violet-50 transition-colors grid place-items-center rounded-md relative cursor-pointer h-[175px] overflow-hidden ${styles}`}
    >
      {previewUrl ? (
        <div className="absolute top-0 left-0 w-full h-full overlay z-10"></div>
      ) : null}
      <div className="grid place-items-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt=""
            className="object-cover rounded-sm w-full  aspect-video absolute"
          />
        ) : (
          <img
            src={camera}
            alt=""
            className="w-[50px] object-cover rounded-md"
          />
        )}

        <h3
          className="mt-4 text-slate-500 font-semibold"
          style={{ lineHeight: 1 }}
        >
          Add a course thumbnail
        </h3>
        <Button styles="mt-2 relative z-20" fit={true} icon={UploadIcon}>
          <span className="mr-2">Upload a picture</span>
          <input
            type="file"
            accept="image/*"
            className="opacity-0 absolute w-full h-full top-0 left-0"
            onChange={handleImageChange}
          />
        </Button>
      </div>
    </div>
  );
}
