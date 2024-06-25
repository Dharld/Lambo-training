import { base64ToBlob } from "../utils/binary";
import { v4 as uuidv4 } from "uuid";
import { encodeUri } from "../utils/url";
import supabase from "../utils/connectSupabase";

const PDF_CONTENT_TYPE = "PDF";
const VIDEO_CONTENT_TYPE = "Video";
const QUIZZ_CONTENT_TYPE = "Quizz";
const VIDEO_BUCKET = "videos";
const PDF_BUCKET = "PDFs";

async function getAllSection(draft_id) {
  try {
    const { data, error } = await supabase
      .from("Section")
      .select("id, draft_id, order, title, items:SectionItem(*)")
      .eq("draft_id", draft_id);

    if (error) {
      console.error("Error fetching sessions: ", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    console.error("Error fetching sessions: ", err.message);
    return { success: false, error: err.message };
  }
}

async function createSection(draft_id, title) {
  try {
    const { data, error } = await supabase
      .from("Section")
      .insert({
        draft_id,
        title,
      })
      .select();
    if (error) {
      console.error("Error adding session: ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: data[0] };
  } catch (err) {
    console.error("Error adding session: ", err.message);
    return { success: false, error: err.message };
  }
}

const getAllowedMimeTypes = function (contentType) {
  switch (contentType) {
    case VIDEO_CONTENT_TYPE:
      return ["video/mp4", "video/webm", "video/ogg"];
    case PDF_CONTENT_TYPE:
      return ["application/pdf"];
    case "Image":
      return ["image/jpeg", "image/png"];
    default:
      return [];
  }
};

async function addSectionItem(
  section_id,
  title,
  base64String,
  contentType,
  quizDetails
) {
  try {
    if ([VIDEO_CONTENT_TYPE, PDF_CONTENT_TYPE].includes(contentType)) {
      const mimeType = base64String.match(/data:(.*?);base64,/)[1];
      const fileExt = mimeType.split("/").pop();
      const blob = base64ToBlob(base64String, getAllowedMimeTypes(contentType));

      const id = uuidv4();
      const encodedTitle = encodeUri(title);
      const filePath = `section-${section_id

        .toString()
        .padStart(3, "0")}/${encodedTitle}-${id}.${fileExt}`;

      // Determine storage bucket based on content type
      const bucket =
        contentType === VIDEO_CONTENT_TYPE ? VIDEO_BUCKET : PDF_BUCKET;

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(filePath, blob, { upsert: true });

      if (uploadError) {
        console.error(
          `Error uploading ${contentType.toLowerCase()}: `,
          uploadError.message
        );
        return { success: false, error: uploadError.message };
      }

      const { data, error: urlError } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Error getting public URL:", urlError.message);
        return { success: false, error: urlError.message };
      }

      const publicURL = data.publicUrl;
      console.log(contentType === VIDEO_CONTENT_TYPE);

      const details = {};
      if (contentType === VIDEO_CONTENT_TYPE) {
        details.video_url = publicURL;
      } else if (contentType === PDF_CONTENT_TYPE) {
        details.pdf_url = publicURL;
      }

      // Save to the supabase storage
      const { data: finalData, error } = await supabase
        .from("SectionItem")
        .insert({
          section_id,
          title,
          content_type: contentType,
          details,
        })
        .select("item_id, title, details, section_id, content_type, details");

      if (error) {
        console.error(
          `Error adding ${contentType.toLowerCase()}: `,
          error.message
        );
        return { success: false, error: error.message };
      }

      return { success: true, data: finalData[0] };
    } else if (contentType == QUIZZ_CONTENT_TYPE) {
      try {
        if (!quizDetails) {
          return { success: false, error: "Please enter quiz details" };
        }

        const { data, error } = await supabase
          .from("SectionItem")
          .insert({
            section_id,
            title,
            content_type: QUIZZ_CONTENT_TYPE,
            details: quizDetails,
          })
          .select("id, order, title, details, section_id");

        if (error) {
          console.error("Error adding quizz: ", error.message);
          return { success: false, error: error.message };
        }

        return { success: true, data: data[0] };
      } catch (err) {
        console.error("Error adding quizz: ", err.message);
        return { success: false, error: err.message };
      }
    }
  } catch (err) {
    console.error(
      `Error uploading ${contentType.toLowerCase()}: `,
      err.message
    );
    return { success: false, error: err.message };
  }
}

export default {
  getAllSection,
  createSection,
  addSectionItem,
  PDF_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
  QUIZZ_CONTENT_TYPE,
};
