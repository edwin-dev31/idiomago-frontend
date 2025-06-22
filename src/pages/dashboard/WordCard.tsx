// src/components/WordCard.tsx

import React from "react";
import { Heart, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Word } from "@/types/types"; // ✅ Asegúrate que este import esté correcto

interface WordCardProps {
  word: Word;
  selectedLanguages: string[];
  onFavoriteToggle: (id: number) => void; // ✅ Aquí corregimos a number
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  selectedLanguages,
  onFavoriteToggle,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="relative">
        <img
          alt="Word illustration"
          className="w-full h-48 object-cover"
          src={
            word.image ||
            "https://images.unsplash.com/photo-1613235527857-bf2d37e5b350"
          }
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => onFavoriteToggle(word.id)} // ✅ Directamente el id
        >
          <Heart
            className={`h-6 w-6 ${
              word.favorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </Button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-blue-900">{word.word}</h3>
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
            <h4 className="text-sm font-semibold text-blue-900">Definition:</h4>
            <p className="text-gray-700">{word.definition}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-blue-900">Example:</h4>
            <p className="text-gray-700 italic">{word.example}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WordCard;
