import supabase from "../utils/connectSupabase";
// import { addImage as addImageHelper } from "../utils/supabaseImages";

// const addImage = async (userEmail, avatarFile) => {
//   const type = avatarFile.type.split("/")[1];
//   console.log(type);
//   const path = `images/${userEmail}/avatar.${type}`;
//   return addImageHelper(path, avatarFile);
// };

async function addAdmin(name, email, password) {
  const { err } = await supabase.auth.signUp({
    email,
    password,
  });

  if (err) {
    console.error("Error signing up: ", err);
    return;
  }

  const { error: rpcError } = await supabase.rpc("add_admin", {
    name,
    email,
    password, // Note: The password will be hashed in the procedure
  });

  if (rpcError) {
    console.error("Error calling add_admin procedure:", rpcError);
    throw new Error("Can't add new admin", rpcError);
  }

  console.log("Admin user created and role assigned successfully");
}

async function login(email, password) {
  // Step 1: Sign in the user using Supabase's auth.signIn method
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in: ", error);
    return;
  }

  // Step 2: Retrieve additional user data from your custom User table
  const { data: userData, error: userError } = await supabase.rpc(
    "get_user_with_role",
    {
      user_email: email,
    }
  );

  if (userError) {
    console.error("Error fetching user data: ", userError);
    return;
  }

  console.log("User signed in successfully:", userData);
  return userData[0];
}

export default { addAdmin, login };
