import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import WordCard from "@/components/WordCard";
import { useWords } from "@/lib/Hooks/Words/useWords";
import { useUserFavorites } from "@/lib/Hooks/Favorites/useUserFavorites";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { words, loading } = useWords();
  const { favorites } = useUserFavorites();

  return (
    <>
      <h1 className="text-2xl font-bold text-[#1B3B48] mb-6">Featured Words</h1>

      <div className="flex gap-4 mb-8">
        {["Spanish", "English", "German"].map((lang) => (
          <motion.div
            key={lang}
            whileHover={{ scale: 1.05 }}
            className="bg-[#D9E6E9] rounded-2xl shadow-lg px-6 py-3"
          >
            <span className="text-[#1B3B48] font-medium">{lang}</span>
          </motion.div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-[#1B3B48] mb-4">Search & Filter</h2>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Word Search", icon: "📚", path: "/word-search" },
          { label: "Word Categories", icon: "🔍", path: "/word-categories" },
          { label: "Word Definition", icon: "📖", path: "/word-definition" },
          { label: "Word Example", icon: "✏️", path: "/word-example" },
        ].map((item) => (
          <Link to={item.path} key={item.label}>
            <Button
              variant="outline"
              className="h-24 w-full flex flex-col items-center justify-center bg-[#D9E6E9] rounded-2xl shadow-lg"
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-[#1B3B48]">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>

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
