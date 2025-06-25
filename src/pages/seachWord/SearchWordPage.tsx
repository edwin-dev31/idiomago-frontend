import React from "react";
import WordCard from "@/pages/dashboard/WordCard"; 
import { Word } from "@/lib/WordView";
type SearchProps = {
  words: Word[];
  selectedLanguages: string[]; 
  onFavoriteToggle: (id: number) => void; 
};

const SearchWordPage: React.FC<SearchProps> = ({ words, selectedLanguages, onFavoriteToggle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {words.map((word) => (
        <WordCard
          key={word.wordId}
          word={word}
          selectedLanguages={selectedLanguages}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default SearchWordPage;
