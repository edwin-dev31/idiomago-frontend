import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { toast } from "react-hot-toast";
import { getAuthHeaders } from "@/lib/hooks/Words/getAuthHeaders";
import { UpdateWordTranslationDTO } from "@/types/updateWordTranslationDTO";

async function updateTranslation(translationId: number, data: UpdateWordTranslationDTO) {
  const { userId, authHeaders } = getAuthHeaders();

  if (!userId) {
    toast.error("User not authenticated.");
    return;
  }

  try {
    const res = await javaAPI.put(
      apiRoutes.translations.update(translationId),
      data,
      {
        headers: authHeaders,
      }
    );
    toast.success("Translation updated!");
    return res.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Error updating translation.";
    toast.error(message);
    throw err;
  }
}

async function deleteTranslation(translationId: number) {
  const { userId, authHeaders } = getAuthHeaders();

  if (!userId) {
    toast.error("User not authenticated.");
    return;
  }

  try {
    await javaAPI.delete(apiRoutes.translations.delete(translationId, userId), {
      headers: authHeaders,
    });
    toast.success("Translation deleted!");
  } catch (err: any) {
    const message = err?.response?.data?.message || "Error deleting translation.";
    toast.error(message);
    throw err;
  }
}

export { updateTranslation, deleteTranslation };
