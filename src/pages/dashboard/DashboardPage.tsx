import React from "react";
import { motion } from "framer-motion";
import WordCard from "@/components/WordCard";
import { useWords } from "@/lib/Hooks/Words/useWords";
import { useUserFavorites } from "@/lib/Hooks/Favorites/useUserFavorites";
import DashboardHeader from "./DashboardHeader";

const DashboardPage: React.FC = () => {
  const { words, loading } = useWords();
  const { favorites } = useUserFavorites();

  return (
    <>
      <DashboardHeader/>

      <h2 className="text-xl font-semibold text-[#1B3B48] mb-4">Words in all languages</h2>

      {loading ? (
        <p className="text-gray-500">Loading words...</p>
      ) : words.length === 0 ? (
        <p className="text-gray-500">No words available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {words.map((word, index) => {
            const isFavorite = favorites.some(
              (fav) => fav.wordTranslationId === word.wordTranslationId
            );

            return (
              <motion.div
                key={word.wordTranslationId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <WordCard word={word} isFavorite={isFavorite} />
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DashboardPage;
