// src/lib/Hooks/Words/useChangeImage.ts
import { javaAPI } from "@/lib/axios";
import { toast } from "react-hot-toast";

export async function changeImage(wordTranslationId: number) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("User not authenticated.");
    return null;
  }

  try {
    const response = await javaAPI.post(
      `/api/view/images/change/${wordTranslationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Image updated successfully 📷");
    return response.data.message; 
  } catch (error) {
    toast.error("Failed to change image");
    console.error("❌ Error changing image:", error);
    return null;
  }
}
