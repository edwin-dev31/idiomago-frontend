import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const OAuthSuccess = () => {
  console.log("✅ Componente OAuthSuccess montado");
  const navigate = useNavigate();
  const alreadyHandled = useRef(false); 

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
      console.log("Login with OAuth successful!")
      setTimeout(() => navigate("/home"), 300);
    } else {
      toast.error("No token received from OAuth");
      console.log("No token received from OAuth")
      setTimeout(() => navigate("/login"), 300);
    }
  }, [navigate]);

  return <p style={{ textAlign: "center", marginTop: "2rem" }}>Processing login...</p>;

};

export default OAuthSuccess;
