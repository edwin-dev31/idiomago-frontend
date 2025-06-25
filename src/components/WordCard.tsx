import React from "react";
import { Word } from "@/lib/WordView";
import { Heart, SwitchCamera } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Props {
  word: Word;
  isFavorite: boolean;
  onFavoriteToggle: () => void; 
  onChangeImage: () => void;
}

const WordCard: React.FC<Props> = ({ word, isFavorite, onFavoriteToggle, onChangeImage }) => {
  const fallbackImage = "https://images.unsplash.com/photo-1549287540-b5e39fc85fa1";
  const imageUrl = word.imageUrl || fallbackImage;

  return (
    <div className="bg-[#EAF3F5] rounded-2xl shadow-md overflow-hidden border border-gray-200 relative">
      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={onFavoriteToggle}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => onFavoriteToggle()} 
                >
                  <Heart
                    className={`h-6 w-6 ${
                      word.isFavorite ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4"
          onClick={onChangeImage}
        >
          <SwitchCamera className="h-6 w-6 text-white" />
        </Button>

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
