import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      toast.success("OAuth login successful!");
      navigate("/"); // Redirige al Home
    } else {
      toast.error("No token received from OAuth provider.");
      navigate("/login");
    }
  }, []);

  return null; // Puedes mostrar un loader si deseas
};

export default OAuthSuccess;
