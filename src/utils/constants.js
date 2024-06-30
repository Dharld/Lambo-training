import sectionService from "../services/sectionService";

const VERTICAL = "VERTICAL";
const HORIZONTAL = "HORIZONTAL";

const pdfType = sectionService.PDF_CONTENT_TYPE;
const videoType = sectionService.VIDEO_CONTENT_TYPE;
const quizzType = sectionService.QUIZZ_CONTENT_TYPE;

const ANSWER_CORRECT_STATUS = "CORRECT";
const ANSWER_INCORRECT_STATUS = "INCORRECT";

export {
  VERTICAL,
  HORIZONTAL,
  pdfType,
  videoType,
  quizzType,
  ANSWER_CORRECT_STATUS,
  ANSWER_INCORRECT_STATUS,
};
