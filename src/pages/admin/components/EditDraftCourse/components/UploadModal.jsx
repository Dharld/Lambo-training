/* eslint-disable react/prop-types */
import { AiOutlineUpload } from "react-icons/ai";
import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Input/Input";
import Modal from "../../../../../components/Modal/Modal";
import { useRef, useState } from "react";
import { useContent } from "../../ContentProvider";
import sectionService from "../../../../../services/sectionService";

const VIDEO_UPLOAD = "video-upload";
const PDF_UPLOAD = "pdf-upload";
const QUIZ_UPLOAD = "img-upload";

const pdfType = sectionService.PDF_CONTENT_TYPE;
const videoType = sectionService.VIDEO_CONTENT_TYPE;
const quizzType = sectionService.QUIZZ_CONTENT_TYPE;

const UploadVideo = () => {};

const UploadModal = ({
  id,
  isOpen,
  type,
  onUpdateSection,
  onErrorUpload,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [newLectureTitle, setNewLectureTitle] = useState("");

  const { addSectionItem } = useContent();

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
      console.error(err);
      onErrorUpload && onErrorUpload(err.message);
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

export default UploadModal;
