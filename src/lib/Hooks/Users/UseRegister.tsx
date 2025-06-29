import { javaAPI } from "@/lib/axios"

interface RegisterData {
  username: string
  email: string
  password: string
}

export function useRegister() {
  const register = async ({ username, email, password }: RegisterData) => {
    try {
      const response = await javaAPI.post("/auth/register", { username, email, password })

      const message = response.data?.message;
      console.log("Register success:", message);
      
      return { success: true, message }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Unexpected error during registration.";
      console.error("Error in register:", errorMessage);

      return { success: false, message: errorMessage }
    }
  }

  return { register }
}
