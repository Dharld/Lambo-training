/* eslint-disable react/prop-types */
import { AiOutlineFilePdf, AiOutlinePlaySquare } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import Modal from "../../../../../components/Modal/Modal";
import { useState } from "react";
import Button from "../../../../../components/Button/Button";
import { pdfType, quizzType, videoType } from "../../../../../utils/constants";

export default function Lecture({ id, order, title, previewVideo, type }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="mt-2  bg-slate-50 border-b py-3 px-4 lecture">
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="w-[400px] py-6 bg-white rounded-md flex flex-col px-8 justify-center">
          <h2 className="font-bold text-xl">Are you sure ?</h2>
          <p className="text-gray-500 my-2">
            This action is irreversible and may have significant consequences.
            Please proceed with caution.
          </p>
          <div className="flex gap-1 mt-4">
            <Button
              styles="bg-transparent border border-violet-500 text-violet-500 hover:bg-violet-500  hover:text-white"
              handleClick={closeModal}
            >
              Cancel
            </Button>
            <Button styles="text-white">Delete</Button>
          </div>
        </div>
      </Modal>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2 w-full">
          <span>Lecture {order}: </span>
          <div className="flex items-center gap-1">
            {type === videoType && <AiOutlinePlaySquare />}
            {type === pdfType && <AiOutlineFilePdf />}
            {type === quizzType && <PiStudent />}
            <span>{title}</span>
          </div>
          <div className="flex-1"></div>
          <span
            className="text-violet-500 cursor-pointer hover:text-violet-400 hover:underline"
            onClick={openModal}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
}
