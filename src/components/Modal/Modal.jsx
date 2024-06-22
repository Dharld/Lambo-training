/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import Overlay from "../Overlay/Overlay";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const closeWithAnimation = useCallback(() => {
    // We launch the animation only if the modal is open
    if (isOpen) {
      modalRef.current.classList.remove("fade-in");
      modalRef.current.classList.add("fade-out");
      setTimeout(() => {
        onClose();
      }, 300);
    }
  });

  useEffect(() => {
    if (!isOpen) return; // Only run the effect if the modal is open.

    const timer = setTimeout(() => {
      if (modalRef.current) {
        // Check if modalRef.current is not null
        modalRef.current.classList.remove("opacity-0");
        modalRef.current.classList.add("fade-in");
      }
    }, 300);

    return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts or if isOpen changes.
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeWithAnimation();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Overlay isVisible={isOpen} onClose={closeWithAnimation}>
      <div
        className="opacity-0 relative"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <button
          className="absolute right-2 top-2 bg-transparent text-violet-400 rounded-full border border-violet-400 hover:bg-violet-400 hover:text-white transition-colors w-[40px] h-[40px]"
          onClick={closeWithAnimation}
        >
          &times;
        </button>
        {children}
      </div>
    </Overlay>
  );
};

export default Modal;
