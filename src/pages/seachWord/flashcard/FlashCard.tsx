import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { FlashCardNavigation } from "./FlashCardNavigation";
import { FlashCardContent } from "./FlashCardContent";
import { useSearchWords } from "@/lib/Hooks/Search/useSearchWords";
import { addFavorite, deleteFavorite } from "@/lib/Hooks/Favorites/useFavoriteActions";
import { Word } from "@/lib/WordView";

const FlashCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [languageCodes, setLanguageCodes] = useState<string[]>([]);

  const { results: words, loading, search, setResults } = useSearchWords();
  const currentWord = words[currentIndex];
  const userId = localStorage.getItem("userId");

  // ⬇️ Recuperar búsqueda previa y códigos seleccionados
  useEffect(() => {
    const savedWord = localStorage.getItem("searchWord");
    const selectedCodes = localStorage.getItem("selectedLanguageCodes");

    if (selectedCodes) {
      const parsedCodes = JSON.parse(selectedCodes); // porque está en formato JSON string
      setLanguageCodes(parsedCodes);
    }

    if (savedWord) {
      setSearchWord(savedWord);
      search(savedWord, JSON.parse(selectedCodes ?? "[]"));
    }
  }, []);

  const handleSearch = () => {
    localStorage.setItem("searchWord", searchWord);
    localStorage.setItem("selectedLanguageCodes", JSON.stringify(languageCodes));

    search(searchWord, languageCodes);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (words.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }
  };

  const handlePrevious = () => {
    if (words.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
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

      setResults((prev: Word[]) =>
        prev.map((word) =>
          word.wordTranslationId === wordId
            ? { ...word, isFavorite: !isFavorite }
            : word
        )
      );
    } catch (err) {
      console.error("❌ Error updating favorite in search:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] p-4">
      <div className="w-full max-w-4xl flex justify-between items-start mb-8">
        <div className="w-[300px]">
          <Input
            type="text"
            placeholder="Search new word"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="bg-[#D9E6E9] text-[#1B3B48] rounded-full px-6 py-3"
          />
        </div>

        <div className="flex flex-col items-end gap-4">
          <LanguageSelector
            onLanguageChange={setLanguageCodes}
          />
          <Button
            onClick={handleSearch}
            className="w-full bg-[#1B3B48] text-white rounded-full py-3 px-8 text-lg"
          >
            SEND
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : words.length === 0 ? (
        <p className="text-gray-400 italic">No words found</p>
      ) : (
        <FlashCardNavigation onPrevious={handlePrevious} onNext={handleNext}>
          <FlashCardContent
            word={currentWord}
            onFavoriteToggle={() =>
              handleFavoriteToggle(currentWord.wordTranslationId, currentWord.isFavorite)
            }
          />
        </FlashCardNavigation>
      )}
    </div>
  );
};

export default FlashCard;
