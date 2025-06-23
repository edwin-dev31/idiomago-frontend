// src/lib/Hooks/Favorites/useFavoriteActions.ts
import { javaAPI } from "@/lib/axios";
import { toast } from "react-hot-toast";

export async function addFavorite(userId: number, wordTranslationId: number) {
  const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.error("Usuario no autenticado.");
      return;
    }
    try {
        await javaAPI.post(
        "/api/favorites",
        { userId, wordTranslationId },
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );
        toast.success("Added to favorites 🧡");
    }
    catch (error) {
      toast.error("Failed to add to favorites");
    }
}

export async function deleteFavorite(userId: number, wordTranslationId: number) {
    const token = localStorage.getItem("token");

    if (!userId || !token) {
    toast.error("Usuario no autenticado.");
    return;
    }
    try {
        
        await javaAPI.delete(`/api/favorites/${userId}/${wordTranslationId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        toast.success("Deleted to favorites 🧡");
    }
    catch (error) {
      toast.error("Failed to delete to favorites");
    }
}
