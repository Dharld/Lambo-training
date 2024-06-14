// This is a serverless function, not part of your React app
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function handler(event) {
  const { name, email, password } = JSON.parse(event.body);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }

  const user_id = data.user.id;

  const { error: rpcError } = await supabase.rpc("add_admin", {
    user_id,
    name,
    email,
    password,
  });

  if (rpcError) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: rpcError.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, data: data }),
  };
}

export { handler };
