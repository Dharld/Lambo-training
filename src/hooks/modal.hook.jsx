/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const openModal = (content) => {
    setIsOpen(true);
    setModalContent(content);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
