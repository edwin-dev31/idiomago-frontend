import { javaAPI } from "@/lib/axios"

interface RegisterData {
  username: string
  email: string
  password: string
}

export function useRegister() {
  const register = async ({ username, email, password }: RegisterData) => {
    try {
      const response = await javaAPI.post("/auth/register", {username, email, password })
      
      const token = response.data?.token;
      console.log(response.data)
      if (token) {
        localStorage.setItem("token", token);
      }

      const userId = response.data?.userId;
      if (userId) {
        localStorage.setItem("userId", userId);
      }
      return response.data
    } catch (error: any) {
      console.error("Error in register", error.response?.data || error.message)
      throw error
    }
  }

  return { register }
}
