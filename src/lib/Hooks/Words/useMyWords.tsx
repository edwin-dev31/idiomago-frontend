import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { useUserFavorites } from "@/lib/Hooks/Favorites/useUserFavorites";
import { Word } from "@/types/WordView";


export function useMyWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, loading: favoritesLoading } = useUserFavorites();

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await javaAPI.get(`/api/view/my-words/${userId}`, {
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
