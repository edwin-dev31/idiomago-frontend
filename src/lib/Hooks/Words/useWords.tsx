// src/lib/Hooks/Words/useWords.ts
import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { useUserFavorites } from "@/lib/Hooks/Favorites/useUserFavorites";
import { Word } from "@/lib/WordView";


export function useWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, loading: favoritesLoading } = useUserFavorites();

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await javaAPI.get("/api/view", {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [favorites, favoritesLoading]);

  return { words, loading: loading || favoritesLoading };
}
