// src/components/FlashCard/FlashCardContent.tsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Volume2 } from "lucide-react";
import { Word } from "@/types/types";

type Props = {
  word: Word;
  onFavoriteToggle: (id: number) => void;
};

export const FlashCardContent: React.FC<Props> = ({ word, onFavoriteToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#D9E6E9] rounded-3xl shadow-xl p-8 w-[600px]"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[#1B3B48] text-xl font-medium">English</span>
        <Button variant="ghost" size="icon" onClick={() => onFavoriteToggle(word.id)}>
          <Heart
            className={`h-8 w-8 ${
              word.favorite ? "fill-[#1B3B48] text-[#1B3B48]" : "text-[#1B3B48]"
            }`}
          />
        </Button>
      </div>

      <div className="mb-6">
        <img
          alt="Word illustration"
          className="w-full h-64 object-cover rounded-2xl"
          src={word.image}
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-bold text-[#1B3B48]">{word.word}</h2>
        <Button variant="ghost" size="icon" className="bg-[#1B3B48] rounded-full h-12 w-12">
          <Volume2 className="h-6 w-6 text-white" />
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-[#1B3B48] mb-2">Definition:</h4>
          <p className="text-[#1B3B48] text-lg">{word.definition}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[#1B3B48] mb-2">Example:</h4>
          <p className="text-[#1B3B48] text-lg italic">{word.example}</p>
        </div>
      </div>
    </motion.div>
  );
};
