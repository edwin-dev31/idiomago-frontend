import { useState } from "react";
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { Word } from "@/types/WordView";
import { SaveSingleWordDTO } from "@/types/SaveSingleWordDTO";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { getFavorites } from "@/lib/hooks/Favorites/useFavoriteActions"; // ✅ Import directo

export function useSearchWords() {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  const { userId, authHeaders } = useAuthStorage();

  const enrichWithFavorites = (words: Word[], favoriteIds: number[]) =>
    words.map((word: Word) => ({
      ...word,
      isFavorite: favoriteIds.includes(word.wordTranslationId),
    }));

  const saveMultiple = async (
    word: string,
    codes: string[],
    category: number
  ): Promise<Word[]> => {
    if (!word || codes.length === 0 || !category) return [];

    try {
      setLoading(true);

      const dto = {
        userId: Number(userId),
        word,
        categoryId: category,
        languageCodes: codes,
      };

      const [wordsRes, favoriteIds] = await Promise.all([
        javaAPI.post(apiRoutes.words.saveMultiple, dto, {
          headers: authHeaders,
        }),
        getFavorites(),
      ]);

      const enriched = enrichWithFavorites(wordsRes.data, favoriteIds);
      setResults(enriched);
      return enriched;
    } catch (err) {
      console.error("❌ Error saving multiple words:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const saveSingle = async (
    data: SaveSingleWordDTO
  ): Promise<Word[] | null> => {
    try {
      setLoading(true);

      const [wordRes, favoriteIds] = await Promise.all([
        javaAPI.post(apiRoutes.words.saveSingle, data, {
          headers: authHeaders,
        }),
        getFavorites(),
      ]);

      const enriched = enrichWithFavorites(wordRes.data, favoriteIds);
      setResults(enriched);
      return enriched;
    } catch (err) {
      console.error("❌ Error saving single word:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    setResults,
    loading,
    saveMultiple,
    saveSingle,
  };
}
