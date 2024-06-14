import supabase from "../utils/connectSupabase";
import { uploadImage } from "../utils/upload.js";

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

async function getUserCourses() {
  const { data, error } = await supabase.rpc("get_user_courses", {});
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
export default {
  addCourse,
  getUserCourses,
  getAllCourses,
  deleteCourse,
  getAllUserEnrolledCourses,
};
