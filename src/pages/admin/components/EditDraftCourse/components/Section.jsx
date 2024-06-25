/* eslint-disable react/prop-types */
import {
  AiFillFile,
  AiOutlineBook,
  AiOutlineCamera,
  AiOutlineFilePdf,
} from "react-icons/ai";
import Button from "../../../../../components/Button/Button";
import Lecture from "./Lecture";
import { useState } from "react";
import UploadModal, { VIDEO_UPLOAD } from "./UploadModal";

export default function Section({
  id,
  order,
  title,
  items,
  styles,
  onUpdateSection,
  onErrorUpload,
}) {
  const [isUploadModalOpen, setisUploadModalOpen] = useState(false);
  const [modalType, setModalType] = useState("video");
  /*State used by the upload modal for a preview */

  const openUploadModal = (upload_type) => {
    setisUploadModalOpen(true);
    setModalType(upload_type);
  };

  const closeUploadModal = () => {
    setisUploadModalOpen(false);
    setModalType(VIDEO_UPLOAD);
  };

  return (
    <div className="section px-6 py-6 bg-gray-100 mt-4">
      <UploadModal
        type={modalType}
        id={id}
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        onUpdateSection={onUpdateSection}
        onErrorUpload={onErrorUpload}
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
              openUploadModal("video_upload");
            }}
          >
            <span className="flex items-center gap-2">
              <AiOutlineCamera />
              Add Video
            </span>
          </Button>
          <Button
            fit={true}
            styles="mt-3 bg-transparent border border-violet-500 text-violet-500 hover:text-white"
            handleClick={() => {}}
          >
            <span className="flex items-center gap-2">
              <AiOutlineFilePdf />
              Add PDF
            </span>
          </Button>
          <Button
            fit={true}
            styles="mt-3 bg-transparent border border-violet-500 text-violet-500 hover:text-white"
            handleClick={() => {}}
          >
            <span className="flex items-center gap-2">
              <AiOutlineBook />
              Add Quizz
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
