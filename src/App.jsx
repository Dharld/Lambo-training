import { Outlet, useNavigate } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";
import "./App.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import supabase from "./utils/connectSupabase";

function App() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const createNewSession = async (data) => {
    const newExpirationTime = Math.floor(Date.now() / 1000) + data.expires_in;
    const newSessionWithExpiry = {
      ...data,
      expires_at: newExpirationTime,
    };
    return newSessionWithExpiry;
  };

  useEffect(() => {
    const handleSession = async (session) => {
      const currentTime = Math.floor(Date.now() / 1000);

      if (session.expires_at > currentTime) {
        console.log("Here");
        await supabase.auth.setSession(session);
      } else {
        try {
          const { data, error } = await supabase.auth.refreshSession();
          if (error || !data) {
            supabase.auth.signOut();
            localStorage.removeItem("supabase.auth.token");
            navigate("/login");
          } else {
            console.log(data);
            // createNewSession(data);
          }
        } catch (error) {
          console.error("Failed to refresh session:", error);
          supabase.auth.signOut();
          localStorage.removeItem("supabase.auth.token");
          navigate("/login");
        }
      }
    };

    const storedSession = localStorage.getItem("supabase.auth.token");
    if (storedSession) {
      const session = JSON.parse(storedSession);
      handleSession(session);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          createNewSession(session);
        } else {
          localStorage.removeItem("supabase.auth.token");
        }
      }
    );

    if (!user) {
      navigate("/home");
    } else if (user.role === "Super Admin") {
      navigate("/super-admin/home");
    } else if (user.role === "Admin") {
      navigate("/admin/home");
    } else {
      navigate("/user");
    }

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [user, navigate]);

  return <Outlet />;
}

export default App;
