import PropTypes from "prop-types";
import "./Modal.scss";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black font-bold"
        >
          <AiOutlineClose color="white" />
        </button>
        <img
          src={imageUrl}
          alt="Thumbnail Preview"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
