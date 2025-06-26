import { useState } from "react";
import { javaAPI } from "@/lib/axios";
import { Word } from "@/lib/WordView";

export function useSearchWords() {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (
    word: string,
    codes: string[],
    category: string
  ): Promise<Word[]> => {
    if (!word || codes.length === 0 || !category) return [];

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const [wordsRes, favoritesRes] = await Promise.all([
        javaAPI.get("/api/view/search/lang", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            word,
            codes: codes.join(","),
            category,
          },
        }),
        javaAPI.get(`/api/favorites/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const favoriteIds: number[] = favoritesRes.data.map(
        (fav: any) => fav.wordTranslationId
      );

      const enrichedResults: Word[] = wordsRes.data.map((word: Word) => ({
        ...word,
        isFavorite: favoriteIds.includes(word.wordTranslationId),
      }));

      setResults(enrichedResults);
      return enrichedResults;
    } catch (err) {
      console.error("❌ Error fetching search words or favorites:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    setResults,
    loading,
    search,
  };
}
