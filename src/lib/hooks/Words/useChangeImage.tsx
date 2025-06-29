
import { javaAPI } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { getAuthHeaders } from "@/lib/hooks/Words/getAuthHeaders"; 

export async function changeImage(wordTranslationId: number): Promise<string | null> {
  const { token, authHeaders } = getAuthHeaders();

  if (!token) {
    toast.error("User not authenticated.");
    return null;
  }

  try {
    const response = await javaAPI.post(
      apiRoutes.view.changeImage(wordTranslationId),
      {},
      { headers: authHeaders }
    );

    toast.success("Image updated successfully 📷");
    return response.data.message;
  } catch (error) {
    toast.error("Failed to change image");
    console.error("❌ Error changing image:", error);
    return null;
  }
}
