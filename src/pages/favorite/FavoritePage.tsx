// src/pages/Favorites.tsx
import React, { useEffect, useState } from "react";
import WordCardPaginator from "@/components/wordCard/WordCardPaginator";
import { useWordsTFavorite } from "@/lib/hooks/Words/useWords";
import { deleteFavorite } from "@/lib/hooks/Favorites/useFavoriteActions";
import { Word } from "@/types/WordView";
import DashboardHeader from "../dashboard/FilterAndSearchHeader";
import { changeImage } from "@/lib/hooks/Words/useChangeImage";

const FavoritePage: React.FC = () => {
  const { words, loading } = useWordsTFavorite();
  const [favoriteWords, setFavoriteWords] = useState<Word[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setFavoriteWords(words.filter((word) => word.isFavorite));
  }, [words]);

  const handleUnfavorite = async (wordTranslationId: number) => {
    if (!userId) return;

    try {
      await deleteFavorite(wordTranslationId);

      setFavoriteWords((prev) =>
        prev.filter((word) => word.wordTranslationId !== wordTranslationId)
      );
    } catch (error) {
      console.error("❌ Error removing favorite:", error);
    }
  };

  const handleChangeImage = async (wordTranslationId: number) => {
    const newImageUrl = await changeImage(wordTranslationId);

    if (newImageUrl) {
      setFavoriteWords((prev) =>
        prev.map((word) =>
          word.wordTranslationId === wordTranslationId
            ? { ...word, imageUrl: newImageUrl }
            : word
        )
      );
    }
  };

  return (
    <div className="mt-6">
      <DashboardHeader />
      <h1 className="text-2xl font-bold text-[#1B3B48] dark:text-white mb-6">Your Favorite Words</h1>

      {loading ? (
        <p className="text-gray-500">Loading favorites...</p>
      ) : favoriteWords.length === 0 ? (
        <p className="text-gray-500 dark:text-white">You don't have any favorite words yet.</p>
      ) : (
         <WordCardPaginator
            words={favoriteWords}
            onFavoriteToggle={handleUnfavorite}
            onChangeImage={handleChangeImage}
          />
      )}
    </div>
  );
};

export default FavoritePage;
