/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Overlay from "../Overlay/Overlay";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Overlay isVisible={isOpen} onClose={onClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute right-2 top-2 bg-transparent text-violet-400 rounded-full border border-violet-400 hover:bg-violet-400 hover:text-white transition-colors w-[40px] h-[40px]hover:"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </Overlay>
  );
};

export default Modal;
