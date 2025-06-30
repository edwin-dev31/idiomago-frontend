// src/lib/hooks/useLogin.ts
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const { setAuth } = useAuthStorage();

  const login = async ({ email, password }: LoginData) => {
    try {
      const response = await javaAPI.post(apiRoutes.login, { email, password });

      const token = response.data?.token;
      const userId = response.data?.userId;

      if (token && userId) {
        setAuth(token, userId);
      }

      return response.data;
    } catch (error: any) {
      console.error("❌ Login error:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  return { login };
}
