import supabase from "../utils/connectSupabase";
import { uploadImage } from "../utils/upload.js";

async function addCourse(title, description, price, file, level) {
  const { data: thumbnailPath, error: imageUploadError } = await uploadImage(
    file,
    title
  );

  if (imageUploadError) {
    console.error("Error uploading the image");
    throw imageUploadError;
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
    throw new Error("Failed to add course");
  }

  console.log("Course added successfully:", data);
  return data;
}

async function getAllCourses() {
  try {
    const { data, error } = await supabase.rpc("get_all_courses", {});

    if (error) {
      console.error("Error fetching courses: ", error.message);
      throw new Error("Error while fetching courses");
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
    throw new Error("Failed to fetch courses");
  }
  return data;
}

export default { addCourse, getUserCourses, getAllCourses };
