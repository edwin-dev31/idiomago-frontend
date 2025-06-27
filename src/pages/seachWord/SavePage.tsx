import React, { useState } from "react";
import SaveCustomWordForm from "@/components/layout/SaveCustomWordForm";
import SaveMultipleWordForm from "@/components/layout/SaveMultipleWordForm";
import { FlashCardNavigation } from "./flashcard/FlashCardNavigation";
import WordCard from "@/components/WordCard";
import { useSearchWords } from "@/lib/Hooks/Search/useSearchWords";
import { Word } from "@/lib/WordView";
import { changeImage } from "@/lib/Hooks/Words/useChangeImage";
import { addFavorite, deleteFavorite } from "@/lib/Hooks/Favorites/useFavoriteActions";

const SavePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const { saveMultiple, saveSingle, loading } = useSearchWords();
  const currentWord = words[currentIndex];
  const userId = localStorage.getItem("userId");
  const [showCustom, setShowCustom] = useState(true);

  const handleSaveMultiple = async (
    searchWord: string,
    languageCodes: string[],
    category: number
  ) => {
    const results = await saveMultiple(searchWord, languageCodes, category);
    setWords(results);
    setCurrentIndex(0);
    console.log("Multiple Results:", results);
  };

  const handleSaveSingle = async (
    wordData: {
      word: string;
      languageCode: string;
      categoryId: number;
      description: string;
      example: string;
    }
  ) => {
    const results = await saveSingle(wordData);
    if (results) {
      setWords(results);
      setCurrentIndex(0);
      console.log("Single Results:", results);
    }
  };

  const handlePrevious = () => {
    if (words.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    }
  };

  const handleNext = () => {
    if (words.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }
  };

  const handleFavoriteToggle = async (wordId: number, isFavorite: boolean) => {
    if (!userId) return;

    try {
      if (isFavorite) {
        await deleteFavorite(Number(userId), wordId);
      } else {
        await addFavorite(Number(userId), wordId);
      }

      setWords((prev) =>
        prev.map((w) =>
          w.wordTranslationId === wordId
            ? { ...w, isFavorite: !isFavorite }
            : w
        )
      );
    } catch (err) {
      console.error("❌ Error updating favorite:", err);
    }
  };

  const handleChangeImage = async (wordTranslationId: number) => {
    const newImageUrl = await changeImage(wordTranslationId);
    if (newImageUrl) {
      setWords((prev) =>
        prev.map((w) =>
          w.wordTranslationId === wordTranslationId
            ? { ...w, imageUrl: newImageUrl }
            : w
        )
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-7xl flex justify-between gap-8">
        <div className="flex flex-col gap-6 w-[550px]">
          <div className="flex justify-center mb-2">
            <button
              onClick={() => setShowCustom((prev) => !prev)}
              className="text-sm px-4 py-1 rounded-full bg-[#D9E6E9] text-[#1B3B48] shadow"
            >
              Switch to {showCustom ? "Multiple" : "Custom"} Form
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md border p-4 min-h-[540px] flex items-start justify-start">
            {showCustom ? (
              <SaveCustomWordForm onSearch={handleSaveSingle} />
            ) : (
              <SaveMultipleWordForm onSearch={handleSaveMultiple} />
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
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
                onChangeImage={() => handleChangeImage(currentWord.wordTranslationId)}
                width={500}
                height={500}
              />
            </FlashCardNavigation>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavePage;
