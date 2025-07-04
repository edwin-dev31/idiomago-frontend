import React from "react";
import { SwitchCamera, Heart, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Word } from "@/types/WordView";
import WordCardFooterManager from "./WordCardFooterManager";
interface WordCardProps {
  word: Word;
  onFavoriteToggle: (id: number) => void;
  onChangeImage: () => void;
  width?: number;  
  height?: number; 
  hideShare?: boolean;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  onFavoriteToggle,
  onChangeImage,
  width,
  height,
  hideShare
}) => {
  return (
    <motion.div
    id={`word-card-${word.wordTranslationId}`}
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden dark:bg-white"
      style={{ width: `${width}px`, height: `${height}px` }} 
    >
      <div className="relative">
        <img
          alt="Word illustration"
          className="w-full h-48 object-cover"
          src={
            word.imageUrl ||
            "https://images.unsplash.com/photo-1613235527857-bf2d37e5b350"
          }
        />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4"
            onClick={onChangeImage} // ✅ usa el prop
          >
            <SwitchCamera className="h-6 w-6 text-white" />
          </Button>


          <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => onFavoriteToggle(word.wordId)} 
        >
          <Heart
            className={`h-6 w-6 ${
              word.isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </Button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-900">{word.translatedWord.toUpperCase()}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="bg-blue-100 rounded-full"
            onClick={() => {
              // 👉 Aquí podrías agregar funcionalidad de Text-to-Speech
            }}
          >
            <Volume2 className="h-5 w-5 text-blue-900" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-blue-900">Description</h4>
            <p className="text-gray-700">{word.translatedDescription}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-blue-900">Example:</h4>
            <p className="text-gray-700 italic">{word.translatedExample}</p>
          </div>
        </div>
      </div>

<div className="mb-4">
  <WordCardFooterManager
    word={word}
    hideShare={hideShare}
  />
</div>



    </motion.div>
  );
};

export default WordCard;
