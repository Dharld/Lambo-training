/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

const ContentContext = createContext(null);

const ContentProvider = ({ children }) => {
  return (
    <ContentContext.Provider value={{}}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
