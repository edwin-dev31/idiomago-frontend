import React from "react";
import WordCard from "@/pages/dashboard/WordCard"; // (sin llaves {}, porque WordCard es export default)
import { Word } from "@/types/types";

type SearchProps = {
  words: Word[];
  selectedLanguages: string[]; // Añadimos este prop
  onFavoriteToggle: (id: number) => void; // Y este también
};

const SearchWordPage: React.FC<SearchProps> = ({ words, selectedLanguages, onFavoriteToggle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {words.map((word) => (
        <WordCard
          key={word.id}
          word={word}
          selectedLanguages={selectedLanguages}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default SearchWordPage;
