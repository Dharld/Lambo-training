import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    const expirationTime = Math.floor(Date.now() / 1000) + session.expires_in;
    const sessionWithExpiry = { ...session, expires_at: expirationTime };
    localStorage.setItem(
      "supabase.auth.token",
      JSON.stringify(sessionWithExpiry)
    );
  } else {
    localStorage.removeItem("supabase.auth.token");
  }
});

export default supabase;
