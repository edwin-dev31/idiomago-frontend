import React, { useState } from "react";
import SaveCustomWordForm from "@/components/layout/SaveCustomWordForm";
import { Word } from "@/types/WordView";
import { useSearchWords } from "@/lib/hooks/Search/useSearchWords";
import { FlashCardNavigation } from "@/pages/seachWord/flashcard/FlashCardNavigation";
import WordCard from "@/components/wordCard/WordCard";
import { addFavorite, deleteFavorite } from "@/lib/hooks/Favorites/useFavoriteActions";
import { changeImage } from "@/lib/hooks/Words/useChangeImage";
import FilterAndSearchHeader from "@/pages/dashboard/FilterAndSearchHeader";
import { Visibility } from "@/types/Visibility";

const SavePage: React.FC = () => {
  const { saveSingle, loading } = useSearchWords();
  const userId = localStorage.getItem("userId");

  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = words[currentIndex];

  const handleSaveSingle = async (wordData: {
    user: number;
    word: string;
    languageCode: string;
    categoryId: number;
    description: string;
    example: string;
    visibility: Visibility
  }) => {
    const results = await saveSingle(wordData);
    if (results) {
      setWords(results);
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const handleFavoriteToggle = async (id: number, isFavorite: boolean) => {
    if (!userId) return;

    try {
      if (isFavorite) await deleteFavorite(id);
      else await addFavorite(id);

      setWords((prev) =>
        prev.map((w) =>
          w.wordTranslationId === id ? { ...w, isFavorite: !isFavorite } : w
        )
      );
    } catch (err) {
      console.error("❌ Error updating favorite:", err);
    }
  };

  const handleChangeImage = async (id: number) => {
    const newUrl = await changeImage(id);
    if (newUrl) {
      setWords((prev) =>
        prev.map((w) =>
          w.wordTranslationId === id ? { ...w, imageUrl: newUrl } : w
        )
      );
    }
  };

  return (
    <>
      <FilterAndSearchHeader />
      <div className="flex flex-col items-center min-h-[80vh] p-4">
        <div className="w-full max-w-7xl flex flex-col md:flex-row md:items-start justify-center gap-4 md:gap-8 mt-6">
          <div className="w-full md:w-[450px] bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <SaveCustomWordForm onSearch={handleSaveSingle} />
          </div>
          <div className="flex-1 w-full flex items-center justify-center">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : words.length === 0 ? (
              <p className="text-gray-400 italic">No words found</p>
            ) : (
              <FlashCardNavigation onPrevious={handlePrevious} onNext={handleNext}>
                <WordCard
                  word={currentWord}
                  onFavoriteToggle={() =>
                    handleFavoriteToggle(currentWord.wordTranslationId, currentWord.isFavorite)
                  }
                  onChangeImage={() =>
                    handleChangeImage(currentWord.wordTranslationId)
                  }
                  onDelete={() => {
                    setWords(prev => {
                      const newWords = prev.filter(w => w.wordTranslationId !== currentWord.wordTranslationId);
                      if (currentIndex >= newWords.length) {
                        setCurrentIndex(newWords.length - 1 >= 0 ? newWords.length - 1 : 0);
                      }
                      return newWords;
                    });
                  }}
                  onUpdate={(updatedWord) => {
                    setWords(prev =>
                      prev.map(w =>
                        w.wordTranslationId === updatedWord.wordTranslationId ? updatedWord : w
                      )
                    );
                  }}
                />

              </FlashCardNavigation>
            )}
          </div>
        </div>
      </div>
    </>

  );
};

export default SavePage;
