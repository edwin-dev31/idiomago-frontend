// src/lib/hooks/useUserFavorites.ts
import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { Favorite } from "@/types/favorite";

export function useUserFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const { userId, authHeaders } = useAuthStorage();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      try {
        const response = await javaAPI.get(
          apiRoutes.favorites.byUser(userId),
          { headers: authHeaders }
        );

        setFavorites(response.data);
      } catch (err) {
        console.error("❌ Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, authHeaders]);

  return { favorites, loading };
}
