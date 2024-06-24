import { base64ToBlob } from "../utils/binary";
import { v4 as uuidv4 } from "uuid";
import { encodeUri } from "../utils/url";
import supabase from "../utils/connectSupabase";

export const PDF_CONTENT_TYPE = "PDF";
export const VIDEO_CONTENT_TYPE = "Video";
export const QUIZZ_CONTENT_TYPE = "Quizz";

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
    case "Video":
      return ["video/mp4", "video/webm", "video/ogg"];
    case "PDF":
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
        .padStart(2, "0")}/${encodedTitle}-${id}.${fileExt}`;

      // Determine storage bucket based on content type
      const bucket = contentType === VIDEO_CONTENT_TYPE ? "videos" : "PDFs";

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, blob, { upsert: true });

      if (uploadError) {
        console.error(
          `Error uploading ${contentType.toLowerCase()}: `,
          uploadError.message
        );
        return { success: false, error: uploadError.message };
      }

      const fullPath = data.path; // Ensure this matches your Supabase SDK

      const details = {};
      if (contentType === VIDEO_CONTENT_TYPE) {
        details.video_url = `${
          import.meta.env.VITE_SUPABASE_STORAGE_URL
        }public/${fullPath}`;
      } else if (contentType === PDF_CONTENT_TYPE) {
        details.pdf_url = `${
          import.meta.env.VITE_SUPABASE_STORAGE_URL
        }public/${fullPath}`;
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
        .select("id, order, title, details, section_id");

      if (error) {
        console.error(
          `Error adding ${contentType.toLowerCase()}: `,
          error.message
        );
        return { success: false, error: error.message };
      }

      return { success: true, data: finalData[0] };
    } else if (contentType == "Quizz") {
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
};
