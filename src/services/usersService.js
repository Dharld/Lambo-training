import supabase from "../utils/connectSupabase";

async function getAllUsers() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, error: "No session" };
  }

  const currentUserId = session.user.id;

  const { data, error } = await supabase.rpc("get_all_users_with_role", {
    current_user_id: currentUserId,
  }); // Assuming 'id' is the column name for user IDs

  if (error) {
    console.error("Error fetching users: ", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: data };
}

async function deleteUser(id) {
  const { error } = await supabase.rpc("delete_user", { user_id: id });

  if (error) {
    console.error("Error deleting user: ", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data: id };
}

async function updateUser(id, name, email) {
  const { error } = await supabase.rpc("edit_user", {
    p_user_id: id,
    p_name: name,
    p_email: email,
  });

  console.log(name);

  if (error) {
    console.error("Error editing user: ", error.message);
    return { success: false, error: error.message };
  }

  console.log("User with id " + id + " edited successfully.");

  return { success: true, data: id };
}

export default { getAllUsers, deleteUser, updateUser };
