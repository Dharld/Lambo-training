import supabase from "./connectSupabase";
/**
 *
 * Uploads an image to the Supabase storage.
 * @param {File} file - The image file to upload.
 * @param {String} name - The name of the image file.
 * @returns {Promise<string>}
 */
export async function uploadImage(file, name) {
  const extension = file.type ? file.type.split("/")[1] : "png";
  if (!file) return;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`public/${name}.${extension}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image: " + error.message);
    return {
      data: null,
      error,
    };
  }

  return { data: data.fullPath, error: null };
}
