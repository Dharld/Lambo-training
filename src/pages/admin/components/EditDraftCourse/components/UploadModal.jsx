/* eslint-disable react/prop-types */
import Modal from "../../../../../components/Modal/Modal";
import UploadVideoOrPdf from "./UploadVideoOrPdf";
import UploadQuizz from "../UploadQuizz";
import { videoType, pdfType, quizzType } from "../../../../../utils/constants";

const UploadModal = ({
  id,
  isOpen,
  type,
  onUpdateSection,
  onErrorUpload,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[600px] py-6 bg-white rounded-md flex flex-col px-8 justify-center">
        {type === videoType && (
          <UploadVideoOrPdf
            sectionId={id}
            onUpdateSection={onUpdateSection}
            onErrorUpload={onErrorUpload}
            type={videoType}
            onClose={onClose}
          />
        )}
        {type === pdfType && (
          <UploadVideoOrPdf
            sectionId={id}
            onUpdateSection={onUpdateSection}
            onErrorUpload={onErrorUpload}
            type={pdfType}
            onClose={onClose}
          />
        )}
        {type === quizzType && (
          <UploadQuizz
            sectionId={id}
            onUpdateSection={onUpdateSection}
            onErrorUpload={onErrorUpload}
            onClose={onClose}
          />
        )}
      </div>
    </Modal>
  );
};

export default UploadModal;
