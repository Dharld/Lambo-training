/* eslint-disable react/prop-types */
import {
  AiFillFile,
  AiOutlineBook,
  AiOutlineCamera,
  AiOutlineFilePdf,
  AiOutlineUpload,
} from "react-icons/ai";
import Button from "../../../../../components/Button/Button";
import Lecture from "./Lecture";
import { useRef, useState } from "react";
import Modal from "../../../../../components/Modal/Modal";
import Input from "../../../../../components/Input/Input";
import sectionService from "../../../../../services/sectionService";
import { useToast } from "../../../../../hooks/toast.hook";

const pdfType = sectionService.PDF_CONTENT_TYPE;
const videoType = sectionService.VIDEO_CONTENT_TYPE;
const quizzType = sectionService.QUIZZ_CONTENT_TYPE;

const UploadModal = ({
  id,
  isOpen,
  addSectionItem,
  onUpdateSection,
  onErrorUpload,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState(null);
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addSectionItem(id, newLectureTitle, base64String, videoType, null);
      onUpdateSection();
      onClose();
    } catch (err) {
      onErrorUpload(err.message);
      console.error(err);
    }
  };

  const closeAndReset = () => {
    onClose();
    setSelectedFile(null);
    setNewLectureTitle("");
    setBase64String(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAndReset}>
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
            handleClick={closeAndReset}
          >
            Cancel
          </Button>
          {base64String && (
            <Button
              styles="text-white"
              isDisabled={loading}
              loading={loading}
              handleClick={handleSubmit}
            >
              Upload
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default function Section({
  id,
  order,
  title,
  items,
  styles,
  onUpdateSection,
}) {
  const [isUploadModalOpen, setisUploadModalOpen] = useState(false);
  /*State used by the upload modal for a preview */

  const openUploadModal = () => {
    setisUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setisUploadModalOpen(false);
  };

  return (
    <div className="section px-6 py-6 bg-gray-100 mt-4">
      <UploadModal
        id={id}
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        onUpdateSection={onUpdateSection}
      />
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
        {items &&
          items.length > 0 &&
          items.map((l, idx) => (
            <Lecture
              key={l.id}
              id={l.id}
              title={l.title}
              previewVideo={l.video_url}
              order={idx + 1}
            />
          ))}
        <div className="flex gap-2">
          <Button
            fit={true}
            styles="mt-3 bg-transparent border border-violet-500 text-violet-500 hover:text-white"
            handleClick={() => {
              openUploadModal(id);
            }}
          >
            <span className="flex items-center gap-2">
              <AiOutlineCamera />
              New Video
            </span>
          </Button>
          <Button
            fit={true}
            styles="mt-3 bg-transparent border border-violet-500 text-violet-500 hover:text-white"
            handleClick={() => {
              openUploadModal();
            }}
          >
            <span className="flex items-center gap-2">
              <AiOutlineFilePdf />
              New PDF
            </span>
          </Button>
          <Button
            fit={true}
            styles="mt-3 bg-transparent border border-violet-500 text-violet-500 hover:text-white"
            handleClick={() => {
              openUploadModal();
            }}
          >
            <span className="flex items-center gap-2">
              <AiOutlineBook />
              Lecture
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
