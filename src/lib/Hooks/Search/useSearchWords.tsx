import { useState } from "react";
import { javaAPI } from "@/lib/axios";
import { Word } from "@/types/WordView";
import { SaveSingleWordDTO } from "@/types/SaveSingleWordDTO";

export function useSearchWords() {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  const saveMultiple = async (
    word: string,
    codes: string[],
    category: number
  ): Promise<Word[]> => {
    if (!word || codes.length === 0 || !category) return [];

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      // 📦 Construye el DTO tal como el backend espera
      const dto = {
        userId: Number(userId),
        word,
        categoryId: category,
        languageCodes: codes,
      };

      const [wordsRes, favoritesRes] = await Promise.all([
        javaAPI.post("/api/view/save/word/multiple", dto, {
          headers: { Authorization: `Bearer ${token}` },
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
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const [wordRes, favoritesRes] = await Promise.all([
        javaAPI.post("/api/view/save/word/single", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        javaAPI.get(`/api/favorites/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const favoriteIds: number[] = favoritesRes.data.map(
        (fav: any) => fav.wordTranslationId
      );

      const enrichedResults: Word[] = wordRes.data.map((word: Word) => ({
        ...word,
        isFavorite: favoriteIds.includes(word.wordTranslationId),
      }));

      setResults(enrichedResults);
      return enrichedResults;
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
