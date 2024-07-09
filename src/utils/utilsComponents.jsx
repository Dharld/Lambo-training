import { AiOutlineFile, AiOutlinePlayCircle } from "react-icons/ai";
import { pdfType, quizzType, videoType } from "./constants";
import { PiStudent } from "react-icons/pi";

export const COURSE_ICONS = {
  [videoType]: <AiOutlinePlayCircle />,
  [pdfType]: <AiOutlineFile />,
  [quizzType]: <PiStudent />,
};
