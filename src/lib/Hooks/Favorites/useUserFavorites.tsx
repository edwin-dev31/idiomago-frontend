// src/lib/Hooks/useUserFavorites.ts
import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";

export interface Favorite {
  userId: number;
  wordTranslationId: number;
  createdAt: string;
}

export function useUserFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) return;

      try {
        const response = await javaAPI.get(`/api/favorites/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavorites(response.data);
      } catch (err) {
        console.error("❌ Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return { favorites, loading };
}
