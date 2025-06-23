import { javaAPI } from "@/lib/axios";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const login = async ({ email, password }: LoginData) => {
    try {
      const response = await javaAPI.post("/auth/login", { email, password });

      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      const userId = response.data?.userId;
      if (userId) {
        localStorage.setItem("userId", userId);
      }

      return response.data;
    } catch (error: any) {
      console.error("Login error:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  return { login };
}
