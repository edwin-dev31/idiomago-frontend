// src/lib/hooks/Words/useWordsFromEndpoint.ts
import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { useUserFavorites } from "@/lib/hooks/Favorites/useUserFavorites";
import { Word } from "@/types/WordView";

function useWordsFromEndpoint(endpoint: string) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  const { authHeaders } = useAuthStorage();
  const { favorites, loading: favoritesLoading } = useUserFavorites();

  useEffect(() => {
    const fetchWords = async () => {
      try {
        console.log(`➡️ Requesting: ${javaAPI.defaults.baseURL}${endpoint}`); // Log the full URL
        const response = await javaAPI.get(endpoint, {
          headers: authHeaders,
        });
        console.log(`✅ Response from ${endpoint}:`, response.data); // Log the response data

        const wordsWithFavorites: Word[] = response.data.map((word: any) => ({
          ...word,
          isFavorite: favorites.some(
            (fav) => fav.wordTranslationId === word.wordTranslationId
          ),
        }));

        setWords(wordsWithFavorites);
      } catch (err) {
        console.error(`❌ Error fetching words from ${endpoint}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (!favoritesLoading) {
      fetchWords();
    }
  }, [endpoint, favorites, favoritesLoading, authHeaders]);

  return { words, loading: loading || favoritesLoading };
}

export default useWordsFromEndpoint;
