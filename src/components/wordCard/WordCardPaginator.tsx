import React, { useState, useEffect } from "react";
import WordCard from "./WordCard";
import { Word } from "@/types/WordView";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordCardPaginatorProps {
  words: Word[];
  onFavoriteToggle: (id: number, isFavorite: boolean) => void;
  onChangeImage: (id: number) => void;
  cardWidth?: number;
  cardHeight?: number;
}

const CARDS_PER_PAGE = 8;

const WordCardPaginator: React.FC<WordCardPaginatorProps> = ({
  words: initialWords,
  onFavoriteToggle,
  onChangeImage,
  cardWidth,
  cardHeight,
}) => {
  const [words, setWords] = useState<Word[]>(initialWords);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setWords(initialWords);
  }, [initialWords]);

  const totalPages = Math.ceil(words.length / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const visibleWords = words.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const removeWordFromState = (id: number) => {
    setWords((prev) => prev.filter((w) => w.wordTranslationId !== id));
  };

  const updateWordInState = (updatedWord: Word) => {
  setWords((prev) =>
    prev.map((w) =>
      w.wordTranslationId === updatedWord.wordTranslationId ? updatedWord : w
    )
  );
};


  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {visibleWords.map((word, index) => (
          <motion.div
            key={word.wordTranslationId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <WordCard
              word={word}
              onFavoriteToggle={() =>
                onFavoriteToggle(word.wordTranslationId, word.isFavorite)
              }
              onChangeImage={() => onChangeImage(word.wordTranslationId)}
              onDelete={() => removeWordFromState(word.wordTranslationId)} 
              onUpdate={(updated: Word) => updateWordInState(updated)}

              width={cardWidth}
              height={cardHeight}
            />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          className="px-3 py-1 text-sm text-white bg-[#1B3B48] dark:bg-white dark:text-black rounded disabled:opacity-30"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={cn(
              "px-3 py-1 text-sm rounded dark:text-white",
              page === "..."
                ? "text-gray-400 cursor-default"
                : page === currentPage
                ? "bg-[#1B3B48] text-white dark:bg-white dark:text-black"
                : "text-[#1B3B48] hover:bg-[#1B3B48]/10"
            )}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 text-sm text-white bg-[#1B3B48] dark:bg-white dark:text-black rounded disabled:opacity-30"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WordCardPaginator;
