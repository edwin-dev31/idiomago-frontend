// src/lib/hooks/useAuth.ts
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return {
    logout,
    isAuthenticated,
  };
};

