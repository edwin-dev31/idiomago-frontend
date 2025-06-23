import React from "react";
import { Word } from "@/lib/Hooks/Words/useWords";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/Hooks/Favorites/useFavorites";

interface Props {
  word: Word;
  isFavorite: boolean;
}

const WordCard: React.FC<Props> = ({ word, isFavorite }) => {
  const fallbackImage = "https://images.unsplash.com/photo-1549287540-b5e39fc85fa1";
  const imageUrl = word.imageUrl || fallbackImage;
  const { addFavorite } = useFavorites();

  const handleFavorite = () => {
    addFavorite(word.wordTranslationId);
  };

  return (
    <div className="bg-[#EAF3F5] rounded-2xl shadow-md overflow-hidden border border-gray-200 relative">
      <div className="absolute top-3 right-3 cursor-pointer" onClick={handleFavorite}>
        <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </div>

      <img
        src={imageUrl}
        alt={word.originalWord}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#1B3B48]">{word.translatedWord}</h3>
        {word.translatedDescription && (
          <p className="text-sm text-gray-600 mt-1">📖 {word.translatedDescription}</p>
        )}
        {word.translatedExample && (
          <p className="text-sm text-gray-500 mt-1 italic">✏️ {word.translatedExample}</p>
        )}
        <p className="text-xs text-gray-400 mt-2 uppercase">🌐 Lang: {word.languageName}</p>
      </div>
    </div>
  );
};

export default WordCard;
