/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import sectionService from "../../../services/sectionService";
import { useSelector } from "react-redux";

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const draft = useSelector((state) => state.course.draft);

  const getAllSections = async () => {
    try {
      const response = await sectionService.getAllSection(draft.draft_id);
      if (!response.success) {
        console.error("Failed to get sections:", response.error);
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error("Unexpected error in getAllSections:", error);
      throw new Error(error.message);
    }
  };

  const addSection = async (title) => {
    if (!title) {
      console.error("No title provided for the section");
      throw new Error("No title provided for the section");
    }
    try {
      const response = await sectionService.createSection(
        draft.draft_id,
        title
      );
      if (!response.success) {
        console.error("Failed to create section:", response.error);
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error("Unexpected error in addSection:", error);
      throw new Error(error.message);
    }
  };

  const addSectionItem = async (
    id,
    newItemTitle,
    base64String,
    contentType,
    quizDetails
  ) => {
    if (newItemTitle === "") {
      console.error("No title provided for the section item");
      throw new Error("No title provided for the section item");
    }

    return sectionService.addSectionItem(
      id,
      newItemTitle,
      base64String,
      contentType,
      quizDetails
    );
    // return res.data; Uncomment this line if you somewhat need the added item :)
  };

  return (
    <ContentContext.Provider
      value={{ addSection, addSectionItem, getAllSections }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
