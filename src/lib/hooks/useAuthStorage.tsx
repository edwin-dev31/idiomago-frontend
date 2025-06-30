import { useMemo } from "react";

export function useAuthStorage() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const authHeaders = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const setAuth = (token: string, userId: string | number) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId.toString());
  };

  return {
    token,
    userId,
    authHeaders,
    clearAuth,
    setAuth,
  };
}
