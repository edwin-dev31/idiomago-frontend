// src/components/FlashCard/FlashCard.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { FlashCardNavigation } from "./FlashCardNavigation";
import { FlashCardContent } from "./FlashCardContent";
import { Word } from "@/types/types";

type FlashCardProps = {
  words: Word[];
  selectedLanguages: string[];
  onFavoriteToggle: (id: number) => void;
  onLanguageSelect?: (language: string) => void;
};

export const FlashCard: React.FC<FlashCardProps> = ({
  words,
  onFavoriteToggle,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [searchWord, setSearchWord] = React.useState("");

  const currentWord = words[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % words.length);
  const handlePrevious = () => setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);

  if (!currentWord) return <div className="text-center text-gray-500">No words available</div>;

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] p-4">
      {/* Search and language selector */}
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
          <LanguageSelector  />
         
          <Button className="w-full bg-[#1B3B48] text-white rounded-full py-3 px-8 text-lg">
            SEND
          </Button>
        </div>
      </div>

      {/* FlashCard Navigation */}
      <FlashCardNavigation onPrevious={handlePrevious} onNext={handleNext}>
        <FlashCardContent word={currentWord} onFavoriteToggle={onFavoriteToggle} />
      </FlashCardNavigation>
    </div>
  );
};

export default FlashCard;