import supabase from "../utils/connectSupabase";
// import { addImage as addImageHelper } from "../utils/supabaseImages";

// const addImage = async (userEmail, avatarFile) => {
//   const type = avatarFile.type.split("/")[1];
//   console.log(type);
//   const path = `images/${userEmail}/avatar.${type}`;
//   return addImageHelper(path, avatarFile);
// };

async function addSupervisor(name, email, password) {
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
    password,
  });

  if (rpcError) {
    console.error("Error calling add_admin procedure:", rpcError);
    throw new Error("Can't add new supervisor", rpcError);
  }

  console.log("Supervisor created and role assigned successfully");
}

async function addAdmin(name, email, password) {
  const { err } = await supabase.auth.signUp({
    email,
    password,
  });

  if (err) {
    console.error("Error signing up: ", err);
    return;
  }

  const { error: rpcError } = await supabase.rpc("add_super_admin", {
    name,
    email,
    password, // Note: The password will be hashed in the procedure
  });

  if (rpcError) {
    console.error("Error calling add_super_admin procedure:", rpcError);
    throw new Error("Can't add new admin", rpcError);
  }

  console.log("Admin user created and role assigned successfully");
}

async function login(email, password) {
  // Step 1: Sign in the user using Supabase's auth.signIn method
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in: ", error);
    throw new Error("Invalid email or password. Please try again.");
  }

  // Step 2: Retrieve additional user data from your custom User table
  const { data: userData, error: userError } = await supabase.rpc(
    "get_user_with_role",
    {
      user_email: email,
    }
  );

  const { session } = data;

  if (userError) {
    console.error("Error fetching user data: ", userError);
    throw new Error("There's an error within the system.");
  }

  const expirationTime = Math.floor(Date.now() / 1000) + session.expires_in;
  const sessionWithExpiry = { ...session, expires_at: expirationTime };
  localStorage.setItem(
    "supabase.auth.token",
    JSON.stringify(sessionWithExpiry)
  );

  return userData[0];
}

export default { addSupervisor, addAdmin, login };
