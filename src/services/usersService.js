import supabase from "../utils/connectSupabase";

async function getAllUsers() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const currentUserId = session.user.id;

  const { data, error } = await supabase.rpc("get_all_users_with_role", {
    current_user_id: currentUserId,
  }); // Assuming 'id' is the column name for user IDs

  if (error) {
    console.error("Error fetching users: ", error.message);
    return;
  }

  return data;
}

async function deleteUser(id) {
  const { error } = await supabase.rpc("delete_user", { user_id: id });

  if (error) {
    console.error("Error deleting user: ", error.message);
    throw new Error("Error deleting user");
  }

  console.log("User with id " + id + " deleted successfully.");

  return id;
}

async function updateUser(id, name, email) {
  const { error } = await supabase.rpc("edit_user", {
    p_user_id: id,
    p_name: name,
    p_email: email,
  });

  if (error) {
    console.error("Error editing user: ", error.message);
    throw new Error("Error editing user");
  }

  console.log("User with id " + id + " edited successfully.");
}

export default { getAllUsers, deleteUser, updateUser };
