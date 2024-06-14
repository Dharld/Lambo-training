import supabase from "../utils/connectSupabase";
// import { addImage as addImageHelper } from "../utils/supabaseImages";

// const addImage = async (userEmail, avatarFile) => {
//   const type = avatarFile.type.split("/")[1];
//   console.log(type);
//   const path = `images/${userEmail}/avatar.${type}`;
//   return addImageHelper(path, avatarFile);
// };

async function addSupervisor(name, email, password) {
  try {
    const res = await fetch(`/api/add-supervisor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      return { success: false, error: errorBody.message };
    }

    const data = await res.json();

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function addAdmin(name, email, password) {
  try {
    const { err } = await supabase.auth.signUp({
      email,
      password,
    });

    if (err) {
      console.error("Error adding new admin: ", err);
      return { success: false, error: err.message };
    }

    const { error: rpcError } = await supabase.rpc("add_super_admin", {
      name,
      email,
      password, // Note: The password will be hashed in the procedure
    });

    if (rpcError) {
      console.error("Error calling add_super_admin procedure:", rpcError);
      return { success: false, error: rpcError.message };
    }

    console.log("Admin user created and role assigned successfully");

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function login(email, password) {
  // Step 1: Sign in the user using Supabase's auth.signIn method
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in: ", error);
      return { success: false, error: error.message };
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
      return { success: false, error: userError.message };
    }

    const expirationTime = Math.floor(Date.now() / 1000) + session.expires_in;
    const sessionWithExpiry = { ...session, expires_at: expirationTime };
    localStorage.setItem(
      "supabase.auth.token",
      JSON.stringify(sessionWithExpiry)
    );

    return { success: true, data: userData[0] };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function signup(name, email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up: ", error);
      return { success: false, error: error.message };
    }

    const user_id = data.user.id;

    const { error: rpcError } = await supabase.rpc("add_user", {
      user_id,
      name,
      email,
      password,
    });

    if (rpcError) {
      console.error("Error calling add_user procedure:", rpcError);
      return { success: false, error: rpcError.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("We have an error logging out: ", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export default { addSupervisor, addAdmin, login, logout, signup };
