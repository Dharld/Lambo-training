/* eslint-disable react/prop-types */
import { createContext, useContext, useRef, useState } from "react";
import uploadImg from "../../../../../assets/images/upload.png";
import courseService from "../../../../../services/courseService";
import { useSelector } from "react-redux";
import { base64ToBlob } from "../../../../../utils/binary";
import { encodeUri } from "../../../../../utils/url";
import supabase from "../../../../../utils/connectSupabase";

import { useEffect } from "react";

const useLandingData = (
  initialTitle,
  initialDesc,
  initialThumbnailUrl,
  initialPrice,
  initialSubtitle,
  initialLevel
) => {
  const [title, setTitle] = useState(initialTitle ?? "");
  const [desc, setDesc] = useState(initialDesc ?? "");
  const [price, setPrice] = useState(initialPrice);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [level, setLevel] = useState(initialLevel);

  const [thumbnailBlob, setThumbnailBlob] = useState(null);

  const draft = useSelector((state) => state.course.draft);

  useEffect(() => {
    setTitle(draft?.title || "");
    setDesc(draft?.description || "");
    courseThumbnailUrl.current = draft?.thumbnail_url || uploadImg;
  }, [draft]);

  /** Input Fields */
  const updateTitle = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const updateDesc = (e) => {
    const newDesc = e.target.value;
    setDesc(newDesc);
  };

  const updatePrice = (e) => {
    const value = e.target.value;

    // Forbid "minus" sign
    if (value === "-") return;

    // Regular expression to match only numeric values
    const numericPattern = /^\d*$/;

    if (numericPattern.test(value)) {
      const newPrice = parseInt(value, 10);
      // If the value is numeric, update the state
      if (!isNaN(newPrice) && newPrice >= 1) {
        setPrice(newPrice);
      } else {
        // Allow clearing the input field
        setPrice("");
      }
    }
    // If the input is not numeric, do nothing (effectively preventing non-numeric input)
  };

  const updateLevel = (e) => {
    const newLevel = e.target.value;
    setLevel(newLevel);
  };

  const updateSubtitle = (e) => {
    const newSubtitle = e.target.value;
    setSubtitle(newSubtitle);
  };

  /** Image processing */
  const [openCropper, setOpenCropper] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const courseThumbnailUrl = useRef(initialThumbnailUrl || uploadImg);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result?.toString() || "";
      setThumbnailPreview(imageUrl);
      setThumbnailFile(file);
      setOpenCropper(true);
    };
    reader.onerror = () => {
      console.error("Error reading file");
    };

    reader.readAsDataURL(file);
  };

  const updateThumbnail = (imageSrc) => {
    courseThumbnailUrl.current = imageSrc;
    const blob = base64ToBlob(imageSrc, [
      "image/jpg",
      "image/jpeg",
      "image/png",
    ]);
    setThumbnailBlob(blob);
    setOpenCropper(false);
  };

  const closeCropper = () => {
    setOpenCropper(false);
    setThumbnailPreview("");
  };

  const saveOthers = async (
    draftId,
    title,
    description,
    price,
    subtitle,
    level
  ) => {
    const { error } = await supabase
      .from("CourseDraft")
      .update({
        title: title,
        description: description,
        price: price,
        subtitle: subtitle,
        level: level,
      })
      .eq("draft_id", draftId);
    if (error) {
      console.error("Error saving title and description: ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const saveThumbnail = async (draftId, thumbnailBlob, thumbnailFile) => {
    const fileExt = thumbnailFile.name.split(".").pop();
    const filePath = `${encodeUri(draft.title)}.${fileExt}`;
    const res = await courseService.uploadThumbnail(
      draftId,
      thumbnailBlob,
      filePath
    );
    if (!res.success) {
      console.error("Error saving thumbnail: ", res.error);
      return { success: false, error: res.error };
    }

    return { success: true, data: res.data };
  };

  const handleSaveLanding = async () => {
    const draftId = draft.draft_id;
    const newTitle = title;
    const newDescription = desc;

    let thumbnailUploadResult;
    if (thumbnailFile) {
      thumbnailUploadResult = await saveThumbnail(
        draftId,
        thumbnailBlob,
        thumbnailFile
      );
      if (!thumbnailUploadResult.success) {
        console.error("Error saving thumbnail: ", thumbnailUploadResult.error);
        return {
          success: false,
          error: "Error while saving thumbnail",
        };
      }
    }

    console.log(subtitle);

    let titleAndDescriptionResult = await saveOthers(
      draftId,
      newTitle,
      newDescription,
      price,
      subtitle,
      level
    );

    if (!titleAndDescriptionResult.success) {
      return {
        success: false,
        error: "Error saving title/description",
      };
    }

    const newDraft = {
      ...draft,
      title: newTitle,
      description: newDescription,
    };

    if (thumbnailUploadResult) {
      newDraft.thumbnail_url = thumbnailUploadResult.data.publicUrl;
    }

    return { success: true, data: newDraft };
  };

  return {
    level,
    price,
    subtitle,
    desc,
    title,
    thumbnailFile,
    thumbnailPreview,
    courseThumbnailUrl,
    openCropper,
    updateTitle,
    updateDesc,
    updatePrice,
    updateSubtitle,
    updateLevel,
    updateThumbnail,
    closeCropper,
    handleImageChange,
    handleSaveLanding,
  };
};

const LandingContext = createContext();

const LandingDataProvider = ({ children }) => {
  const draft = useSelector((state) => state.course.draft);

  const initialTitle = draft ? draft.title : "";
  const initialDesc = draft ? draft.description : "";
  const initialThumbnailUrl = draft ? draft.thumbnail_url : "";
  const initialPrice = draft ? draft.price : 0;
  const initialSubtitle = draft ? draft.subtitle : "";
  const initialLevel = draft ? draft.level : "Beginner";

  const {
    level,
    price,
    subtitle,
    desc,
    title,
    thumbnailFile,
    thumbnailPreview,
    openCropper,
    courseThumbnailUrl,
    updateTitle,
    updateDesc,
    updatePrice,
    updateSubtitle,
    updateThumbnail,
    updateLevel,
    closeCropper,
    handleImageChange,
    handleSaveLanding,
  } = useLandingData(
    initialTitle,
    initialDesc,
    initialThumbnailUrl,
    initialPrice,
    initialSubtitle,
    initialLevel
  );

  return (
    <LandingContext.Provider
      value={{
        level,
        price,
        subtitle,
        title,
        description: desc,
        thumbnailFile,
        thumbnailPreview,
        openCropper,
        courseThumbnailUrl,
        updateThumbnail,
        closeCropper,
        handleImageChange,
        handleChangeDescription: updateDesc,
        handleChangeTitle: updateTitle,
        handleChangePrice: updatePrice,
        handleChangeSubtitle: updateSubtitle,
        handleChangeLevel: updateLevel,
        handleSaveLanding,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
};

export const useLanding = () => {
  return useContext(LandingContext);
};

export default LandingDataProvider;
