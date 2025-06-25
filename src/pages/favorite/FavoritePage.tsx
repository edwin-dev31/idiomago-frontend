// src/pages/Favorites.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WordCard from "@/components/WordCard";
import { useWords } from "@/lib/Hooks/Words/useWords";
import { deleteFavorite } from "@/lib/Hooks/Favorites/useFavoriteActions";
import { Word } from "@/lib/WordView";
import DashboardHeader from "../dashboard/DashboardHeader";

const FavoritePage: React.FC = () => {
  const { words, loading } = useWords();
  const [favoriteWords, setFavoriteWords] = useState<Word[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setFavoriteWords(words.filter((word) => word.isFavorite));
  }, [words]);

  const handleUnfavorite = async (wordTranslationId: number) => {
    if (!userId) return;

    try {
      await deleteFavorite(Number(userId), wordTranslationId);

      setFavoriteWords((prev) =>
        prev.filter((word) => word.wordTranslationId !== wordTranslationId)
      );
    } catch (error) {
      console.error("❌ Error removing favorite:", error);
    }
  };

  return (
    <div className="mt-6">
      <DashboardHeader />
      <h1 className="text-2xl font-bold text-[#1B3B48] mb-6">Your Favorite Words</h1>

      {loading ? (
        <p className="text-gray-500">Loading favorites...</p>
      ) : favoriteWords.length === 0 ? (
        <p className="text-gray-500">You don't have any favorite words yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteWords.map((word, index) => (
            <motion.div
              key={word.wordTranslationId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <WordCard
                word={word}
                isFavorite={true}
                onFavoriteToggle={() =>
                  handleUnfavorite(word.wordTranslationId)
                }
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
