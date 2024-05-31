import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    switch (user.role) {
      case "Super Admin":
        navigate("/super-admin");
        break;
    }
  }, [user, navigate]);
}
