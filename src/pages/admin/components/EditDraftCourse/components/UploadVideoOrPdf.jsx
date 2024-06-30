/* eslint-disable react/prop-types */
import { AiOutlineUpload } from "react-icons/ai";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Input/Input";
import { useContent } from "../../ContentProvider";
import { useRef, useState } from "react";
import { videoType } from "../../../../../utils/constants";

const UploadVideoOrPdf = ({
  sectionId,
  onClose,
  onUpdateSection,
  onErrorUpload,
  type,
}) => {
  const { addSectionItem } = useContent();

  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [base64String, setBase64String] = useState(null);
  const [newLectureTitle, setNewLectureTitle] = useState("");
  const [accept, setAccept] = useState(
    type === videoType ? "video/*" : "application/pdf"
  );

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addSectionItem(
        sectionId,
        newLectureTitle,
        base64String,
        type,
        null
      );
      onUpdateSection();
      onClose();
    } catch (err) {
      console.error(err);
      onErrorUpload && onErrorUpload(err.message);
    }
  };

  const handleNewLectureTitleChange = (e) => {
    setNewLectureTitle(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64String(reader.result);
      };
    }
  };

  const chooseFile = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept={accept}
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />
      <h2 className="font-bold text-xl">
        Upload {type === videoType ? "Video" : "PDF"}
      </h2>
      {base64String ? (
        <div className="my-4">
          <Input
            value={newLectureTitle}
            handleChange={handleNewLectureTitleChange}
            label="Lecture title"
            styles="my-6"
          />
          {type === videoType ? (
            <video className="w-full rounded-md" controls>
              <source src={base64String} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <embed
              src={base64String}
              type="application/pdf"
              width="100%"
              height="500px"
              className="rounded-md"
            />
          )}
          <div className="text-slate-500 mt-2">{selectedFile.name}</div>
        </div>
      ) : (
        <div className="mt-6 bg-gray-50 h-[30vh] rounded-md grid place-items-center">
          <div
            className="group transition-colors cursor-pointer"
            onClick={chooseFile}
          >
            <AiOutlineUpload className="text-4xl text-slate-500 mx-auto group-hover:text-violet-500 transition-colors" />
            <div className="mt-2 text-slate-500 group-hover:text-violet-500 font-semibold transition-colors">
              Click to upload a file
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-1">
        <Button
          styles="bg-transparent border border-violet-500 text-violet-500 hover:bg-violet-500  hover:text-white"
          handleClick={onClose}
        >
          Cancel
        </Button>
        <Button
          styles="text-white"
          isDisabled={loading}
          loading={loading}
          handleClick={handleSubmit}
        >
          Upload
        </Button>
      </div>
    </>
  );
};

export default UploadVideoOrPdf;
