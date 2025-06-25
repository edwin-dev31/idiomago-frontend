import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WordCard from "./WordCard";
import { useWords } from "@/lib/Hooks/Words/useWords";
import { Word } from "@/lib/WordView";
import DashboardHeader from "./DashboardHeader";
import {addFavorite, deleteFavorite} from "@/lib/Hooks/Favorites/useFavoriteActions";
import { changeImage } from "@/lib/Hooks/Words/useChangeImage"; // ✅ nuevo hook


const DashboardPage: React.FC = () => {
  const { words, loading } = useWords();
  const [localWords, setLocalWords] = useState<Word[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setLocalWords(words);
  }, [words]);

  const handleFavoriteToggle = async (
    wordTranslationId: number,
    isCurrentlyFavorite: boolean
  ) => {
    if (!userId) return;

    try {
      if (isCurrentlyFavorite) {
        await deleteFavorite(Number(userId), wordTranslationId);
      } else {
        await addFavorite(Number(userId), wordTranslationId);
      }

      // Update local state
      setLocalWords((prevWords) =>
        prevWords.map((word) =>
          word.wordTranslationId === wordTranslationId
            ? { ...word, isFavorite: !isCurrentlyFavorite }
            : word
        )
      );
    } catch (error) {
      console.error("❌ Error updating favorite:", error);
    }
  };

  const   handleChangeImage = async (wordTranslationId: number) => {
  const newImageUrl = await changeImage(wordTranslationId);

  if (newImageUrl) {
    setLocalWords((prevWords) =>
      prevWords.map((word) =>
        word.wordTranslationId === wordTranslationId
          ? { ...word, imageUrl: newImageUrl }
          : word
        )
      );
    }
  };
  return (
    <>
      <DashboardHeader />

      <h2 className="text-xl font-semibold text-[#1B3B48] mb-4">
        Words in all languages
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading words...</p>
      ) : localWords.length === 0 ? (
        <p className="text-gray-500">No words available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {localWords.map((word, index) => (
            <motion.div
              key={word.wordTranslationId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <WordCard
                word={word}
                onFavoriteToggle={() =>
                  handleFavoriteToggle(word.wordTranslationId, word.isFavorite)
                }
                onChangeImage={() => handleChangeImage(word.wordTranslationId)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default DashboardPage;
