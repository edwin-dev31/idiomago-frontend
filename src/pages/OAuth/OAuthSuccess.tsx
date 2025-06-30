import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const alreadyHandled = useRef(false); // ⬅️ Anti doble ejecución

  useEffect(() => {
    if (alreadyHandled.current) return;
    alreadyHandled.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");

    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      toast.success("Login with OAuth successful!");
      navigate("/");
    } else {
      toast.error("No token received from OAuth");
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default OAuthSuccess;
