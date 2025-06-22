import React from "react";
import { Word } from "@/lib/Hooks/Word/useWord";

interface Props {
  word: Word;
}

const WordCard: React.FC<Props> = ({ word }) => {
  const fallbackImage = "https://images.unsplash.com/photo-1549287540-b5e39fc85fa1";
  const imageUrl = word.imageUrl || fallbackImage;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <img
        src={imageUrl}
        alt={word.originalWord}
        className="w-full h-40 object-cover"
      />
      {/* Si deseas usar imagen del backend descomenta esto: */}
      {/* <img src={word.imageUrl ?? fallbackImage} alt={word.originalWord} className="..." /> */}

      <div className="p-4">
        <h3 className="text-lg font-bold text-[#1B3B48]">{word.translatedWord}</h3>
        {word.translatedDescription && (
          <p className="text-sm text-gray-600 mt-1">
            📖 {word.translatedDescription}
          </p>
        )}
        {word.translatedExample && (
          <p className="text-sm text-gray-500 mt-1 italic">
            ✏️ {word.translatedExample}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-2">🌐 Lang: {word.languageName}</p>
      </div>
    </div>
  );
};

export default WordCard;
