import { javaAPI } from "@/lib/axios";
import { toast } from "react-hot-toast";

export function useFavorites() {
  const addFavorite = async (wordTranslationId: number) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.error("Usuario no autenticado.");
      return;
    }

    try {
      await javaAPI.post(
        "/api/favorites",
        {
          userId: Number(userId),
          wordTranslationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Añadido a favoritos 🧡");
    } catch (error) {
      console.error("❌ Error al añadir a favoritos:", error);
      toast.error("No se pudo añadir a favoritos.");
    }
  };

  return { addFavorite };
}
