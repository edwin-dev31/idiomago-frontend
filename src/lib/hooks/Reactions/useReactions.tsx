import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { toast } from "react-hot-toast";
import { getAuthHeaders } from "@/lib/hooks/Words/getAuthHeaders";

async function addReaction(wordTranslationId: number, emoji: string) {
  const { userId, authHeaders } = getAuthHeaders();

  if (!userId) {
    toast.error("User not authenticated.");
    return;
  }

  try {
    await javaAPI.post(
      apiRoutes.reactions.base,
      {
        userId: Number(userId),
        wordTranslationId,
        emoji,
      },
      {
        headers: authHeaders,
      }
    );
  } catch (error) {
    console.error("❌ Failed to send reaction:", error);
  }
}

async function deleteReaction(reactionId: number) {
  const { authHeaders } = getAuthHeaders();

  try {
    await javaAPI.delete(apiRoutes.reactions.byId(reactionId), {
      headers: authHeaders,
    });
  } catch (error) {
    console.error("❌ Failed to delete reaction:", error);
  }
}

async function getReactionsByWord(wordTranslationId: number): Promise<any[]> {
  const { authHeaders } = getAuthHeaders();

  try {
    const res = await javaAPI.get(apiRoutes.reactions.byWord(wordTranslationId), {
      headers: authHeaders,
    });
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch reactions:", err);
    return [];
  }
}

export { addReaction, deleteReaction, getReactionsByWord };