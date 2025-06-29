import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { toast } from "react-hot-toast";
import { getAuthHeaders } from "@/lib/hooks/Words/getAuthHeaders";


async function addFavorite(wordTranslationId: number) {
  const { userId, authHeaders } = getAuthHeaders();

  if (!userId) {
    toast.error("Usuario no autenticado.");
    return;
  }

  try {
    await javaAPI.post(
      apiRoutes.favorites.base,
      { userId: Number(userId), wordTranslationId },
      { headers: authHeaders }
    );
    toast.success("Added to favorites 🧡");
  } catch (error) {
    toast.error("Failed to add to favorites ❌");
  }
}

async function deleteFavorite(wordTranslationId: number) {
  const { userId, authHeaders } = getAuthHeaders();

  if (!userId) {
    toast.error("Usuario no autenticado.");
    return;
  }

  try {
    await javaAPI.delete(
      apiRoutes.favorites.byUserAndWord(Number(userId), wordTranslationId),
      { headers: authHeaders }
    );
    toast.success("Removed from favorites 💔");
  } catch (error) {
    toast.error("Failed to remove from favorites ❌");
  }
}

async function getFavorites(): Promise<number[]> {
  const { userId, authHeaders } = getAuthHeaders();

  if (!userId) return [];

  try {
    const res = await javaAPI.get(apiRoutes.favorites.byUser(Number(userId)), {
      headers: authHeaders,
    });
    return res.data.map((fav: any) => fav.wordTranslationId);
  } catch (err) {
    console.error("❌ Failed to get favorites", err);
    return [];
  }
}

export { addFavorite, deleteFavorite, getFavorites };