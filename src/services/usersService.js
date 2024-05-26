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

export default { getAllUsers };
