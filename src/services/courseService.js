import { v4 as uuidv4 } from "uuid";
import { base64ToBlob } from "../utils/binary.js";
import supabase from "../utils/connectSupabase";
import { uploadImage } from "../utils/upload.js";
import { encodeUri } from "../utils/url.js";

async function getAllCoursesPreview() {
  try {
    const { data, error } = await supabase.from("Course").select(`
      course_id,
      title,
      description,
      price,
      subtitle,
      thumbnail_url,
      User:author_id (name)
    `);
    if (error) {
      console.error("Error getting courses: ", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (e) {
    console.error("Error getting courses: ", e.message);
    return { success: false, error: e.message };
  }
}
async function getCourseDetails(courseId) {
  try {
    const { data, error } = await supabase.rpc("get_course_details", {
      p_course_id: courseId,
    });
    if (error) {
      console.error("Error getting course details: ", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data: data };
  } catch (err) {
    console.error("Error getting course details: ", err.message);
    return { success: false, error: err.message };
  }
}

async function publishCourse(draft_id) {
  try {
    const { error } = await supabase.rpc("publish_course_draft", {
      p_draft_id: draft_id,
    });
    if (error) {
      console.error("Error publishing course: ", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data: draft_id };
  } catch (err) {
    console.error("Error publishing course: ", err.message);
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

async function addLectureToSection(section_id, title, base64String) {
  try {
    const mimeType = base64String.match(/data:(.*?);base64,/)[1];
    const fileExt = mimeType.split("/").pop();
    // Transform the base64 string to a blob
    const blob = base64ToBlob(base64String, [
      "video/mp4",
      "video/webm",
      "video/ogg",
    ]);

    const id = uuidv4();
    const encodedTitle = encodeUri(title);
    const filePath = `section-${section_id
      .toString()
      .padStart(2, "0")}/${encodedTitle}-${id}.${fileExt}`;
    /* 
    console.log(blob);
    console.log(filePath); */

    // Store the base64String to supabase storage
    const { data, error: uploadError } = await supabase.storage
      .from("lectures")
      .upload(filePath, blob, { upsert: true });

    if (uploadError) {
      console.error("Error uploading image: ", uploadError.message);
      return { success: false, error: uploadError.message };
    }

    const fullPath = data.fullPath;

    const { data: finalData, error } = await supabase
      .from("Lecture")
      .insert({
        section_id,
        title,
        video_url:
          import.meta.env.VITE_SUPABASE_STORAGE_URL + "public/" + fullPath,
      })
      .select("id, order, title, video_url, section_id");

    if (error) {
      console.error("Error adding lecture: ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data: finalData[0] };
  } catch (err) {
    console.error("Error uploading image: ", err.message);
    return { success: false, error: err.message };
  }
}

async function getAllPublishedCourses(author_id) {
  try {
    const { data, error } = await supabase
      .from("Course")
      .select("*, Category(name)")
      .eq("author_id", author_id);

    if (error) {
      console.error("Error fetching courses: ", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    console.error("Error fetching courses: ", err.message);
    return { success: false, error: err.message };
  }
}

async function deleteLecture(lecture_id, title) {
  // Remove the lecture video from the storage
}

async function getAllSection(draft_id) {
  try {
    const { data, error } = await supabase
      .from("Section")
      .select("id, draft_id, order, title, lectures:Lecture(*)")
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
async function addAudienceDetails(draft_id, requirements, objectives, targets) {
  console.log(requirements);
  const { data, error } = await supabase.rpc("update_course_draft_details", {
    p_draft_id: draft_id,
    p_requirements: requirements,
    p_objectives: objectives,
    p_targets: targets,
  });

  if (error) {
    console.error("Error adding audience details: ", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
async function addCourse(title, description, price, file, level) {
  const { data: thumbnailPath, error: imageUploadError } = await uploadImage(
    file,
    title
  );

  if (imageUploadError) {
    console.error("Error uploading the image");
    return { success: false, error: imageUploadError.message };
  }

  const { data, error } = await supabase.rpc("add_course", {
    p_title: title,
    p_description: description,
    p_price: price,
    p_level: level,
    p_thumbnail_url: thumbnailPath,
  });

  if (error) {
    console.error("Error adding course:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

async function getAllCourses() {
  try {
    const { data, error } = await supabase.rpc("get_all_courses", {});

    if (error) {
      console.error("Error fetching courses: ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function getAllDrafts(author_id) {
  try {
    const { data, error } = await supabase
      .from("CourseDraft")
      .select(
        `
        *,
        Category (name)  
      `
      )
      .eq("author_id", author_id);
    /* await supabase.rpc("get_user_drafts", {
      p_author_id: author_id,
    }); */
    if (error) {
      return { success: false, error: error.message };
    }
    return {
      success: true,
      data,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
async function createDraftCourse(title, category_id) {
  try {
    const { data, error } = await supabase.rpc("add_course_draft", {
      p_title: title,
      p_category_id: category_id,
    });
    if (error) {
      console.error("Error fetching courses: ", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function getUserCourses() {
  const { data, error } = await supabase.rpc("get_user_courses", {});
  if (error) {
    console.error("Error fetching courses: ", error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

async function getAllUserNonEnrolledCourses(user_id) {
  const { data, error } = await supabase.rpc("get_user_not_enrolled_courses", {
    p_user_id: user_id,
  });
  if (error) {
    console.error("Error fetching courses: ", error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

async function getAllUserEnrolledCourses(user_id) {
  const { data, error } = await supabase.rpc("get_user_enrolled_courses", {
    p_user_id: user_id,
  });
  if (error) {
    console.error("Error fetching courses: ", error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

async function deleteCourse(id) {
  const { error } = await supabase.rpc("delete_course", {
    p_course_id: id,
  });
  if (error) {
    console.error("Error deleting course: ", error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data: id };
}

async function getCategories() {
  const { data, error } = await supabase.rpc("get_all_categories", {});
  if (error) {
    console.error("Error fetching categories: ", error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data };
}

/**
 * Save the thumbnail path to the draft db entity with id {draft_id}
 * @param {string'uid'} id
 * @param {string} thumbnail
 * @returns {Promise<{success: boolean, error: string} | {success: boolean, data: any}>}
 */
async function saveThumbnailPathToDb(draft_id, fullPath) {
  const { error } = await supabase
    .from("CourseDraft")
    .update({
      thumbnail_url: fullPath,
    })
    .eq("draft_id", draft_id);

  if (error) {
    console.error("Error saving thumbnail path: ", error.message);
    // Clean up the uploaded file
    await supabase.storage.from("thumbnails").remove([fullPath]);
    console.error("Error saving file path to the database:", error);

    return { success: false, error: error.message };
  }

  // Storage get the full path of the file from supabase
  return { success: true };
}

/**
 * Uploads a thumbnail image to the storage bucket
 * @param {File} file The file to upload
 * @returns {Promise<{success: boolean, error: string}>}
 */
async function uploadThumbnail(draft_id, blob, filePath) {
  if (!blob) {
    return { success: false, error: "No file selected" };
  }

  let { error: uploadError } = await supabase.storage
    .from("thumbnails")
    .upload(filePath, blob, { upsert: true });

  if (uploadError) {
    return { success: false, error: uploadError.message };
  }

  // Get the public thumbnail
  const {
    data: { publicUrl },
    error,
  } = supabase.storage.from("thumbnails").getPublicUrl(filePath);

  if (error) {
    console.error("Error getting thumbnail url: ", error.message);
    await supabase.storage.from("thumbnails").remove([filePath]);
    return { success: false, error: error };
  }

  // Save the public URL to the database
  const saveResult = await saveThumbnailPathToDb(draft_id, publicUrl);

  if (!saveResult.success) {
    // If saving to the database fails, clean up the uploaded file
    await supabase.storage.from("thumbnails").remove([filePath]);
    return { success: false, error: saveResult.message };
  }

  return { success: true, data: publicUrl };
}

async function deleteDraft(draft_id) {
  const { error } = await supabase
    .from("CourseDraft")
    .delete()
    .eq("draft_id", draft_id);
  if (error) {
    console.error("Error deleting draft: ", error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data: draft_id };
}

export default {
  addLectureToSection,
  addAudienceDetails,
  createDraftCourse,
  createSection,
  addCourse,
  getUserCourses,
  getAllPublishedCourses,
  getAllSection,
  getAllCourses,
  getAllCoursesPreview,
  getCourseDetails,
  deleteCourse,
  getAllUserEnrolledCourses,
  getAllUserNonEnrolledCourses,
  getAllDrafts,
  getCategories,
  publishCourse,
  uploadThumbnail,
  deleteDraft,
};
