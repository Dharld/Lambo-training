/* eslint-disable react/prop-types */
import { AiFillFile, AiOutlinePlus, AiOutlineUpload } from "react-icons/ai";
import Button from "../../../../../components/Button/Button";
import Lecture from "./Lecture";
import { useRef, useState } from "react";
import Modal from "../../../../../components/Modal/Modal";
import Input from "../../../../../components/Input/Input";

export default function Section({
  id,
  order,
  title,
  lectures,
  styles,
  addLectureToSession,
  loading,
}) {
  const inputRef = useRef(null);

  /*State used by the upload modal for a preview */
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newLectureTitle, setNewLectureTitle] = useState("");

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

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    setSelectedFile(null);
    setNewLectureTitle("");
    setBase64String(null);
  };

  return (
    <div className="section px-6 py-6 bg-gray-100 mt-4">
      <Modal isOpen={isUploadModalOpen} onClose={closeUploadModal}>
        <div className="w-[400px] py-6 bg-white rounded-md flex flex-col px-8 justify-center">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
          />
          <h2 className="font-bold text-xl">Upload Video</h2>
          {base64String ? (
            <div className="my-4">
              <Input
                value={newLectureTitle}
                handleChange={handleNewLectureTitleChange}
                label="Lecture title"
                styles="my-6"
              />
              <video className="w-full rounded-md" controls>
                <source src={base64String} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="text-slate-500 mt-2">{selectedFile.name}</div>
            </div>
          ) : (
            <div className="mt-6 bg-gray-50 h-[20vh] rounded-md grid place-items-center">
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
          <div className="flex gap-1 mt-4">
            <Button
              styles="bg-transparent border border-violet-500 text-violet-500 hover:bg-violet-500  hover:text-white"
              handleClick={closeUploadModal}
            >
              Cancel
            </Button>
            {base64String && (
              <Button
                styles="text-white"
                isDisabled={loading}
                loading={loading}
                handleClick={() =>
                  addLectureToSession(
                    id,
                    newLectureTitle,
                    base64String,
                    closeUploadModal
                  )
                }
              >
                Upload
              </Button>
            )}
          </div>
        </div>
      </Modal>
      <div className="flex items-center gap-2">
        <span className="font-bold text-base">Section {order}: </span>
        <span className="flex items-center gap-1">
          <i>
            <AiFillFile />
          </i>{" "}
          <span>{title}</span>
        </span>
      </div>
      <div className={"section " + styles}>
        {lectures &&
          lectures.length > 0 &&
          lectures.map((l, idx) => (
            <Lecture
              key={l.id}
              id={l.id}
              title={l.title}
              previewVideo={l.video_url}
              order={idx + 1}
            />
          ))}
        <Button
          fit={true}
          styles="mt-3 bg-transparent border border-violet-500 text-violet-500 hover:text-white"
          handleClick={() => {
            openUploadModal(id);
          }}
        >
          <span className="flex items-center gap-2">
            <AiOutlinePlus />
            Lecture
          </span>
        </Button>
      </div>
    </div>
  );
}
