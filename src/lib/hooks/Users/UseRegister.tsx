// src/lib/hooks/useRegister.ts
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export function useRegister() {
  const register = async ({ username, email, password }: RegisterData) => {
    try {
      const response = await javaAPI.post(apiRoutes.register, {
        username,
        email,
        password,
      });

      const message = response.data?.message || "Registration successful.";

      return { success: true, message };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Unexpected error during registration.";

      return { success: false, message: errorMessage };
    }
  };

  return { register };
}
