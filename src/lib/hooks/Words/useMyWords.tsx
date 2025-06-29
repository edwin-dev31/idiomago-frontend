// src/lib/hooks/Words/useMyWords.ts
import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { useUserFavorites } from "@/lib/hooks/Favorites/useUserFavorites";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { Word } from "@/types/WordView";

export function useMyWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  const { userId, authHeaders } = useAuthStorage();
  const { favorites, loading: favoritesLoading } = useUserFavorites();

  useEffect(() => {
    const fetchWords = async () => {
      if (!userId) return;

      try {
        const response = await javaAPI.get(apiRoutes.words.myWords(userId), {
          headers: authHeaders,
        });

        const wordsWithFavorites: Word[] = response.data.map((word: any) => ({
          ...word,
          isFavorite: favorites.some(
            (fav) => fav.wordTranslationId === word.wordTranslationId
          ),
        }));

        setWords(wordsWithFavorites);
      } catch (err) {
        console.error("❌ Error fetching words:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!favoritesLoading) {
      fetchWords();
    }
  }, [favorites, favoritesLoading, userId, authHeaders]);

  return { words, loading: loading || favoritesLoading };
}
