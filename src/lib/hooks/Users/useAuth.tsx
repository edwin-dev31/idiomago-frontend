import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";

export const useAuth = () => {
  const navigate = useNavigate();
  const { token, clearAuth } = useAuthStorage();

  const logout = () => {
    clearAuth(); 
    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return {
    logout,
    isAuthenticated,
  };
};
 