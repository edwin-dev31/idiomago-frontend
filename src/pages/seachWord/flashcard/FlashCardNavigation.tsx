// src/components/FlashCard/FlashCardNavigation.tsx
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type Props = {
  onPrevious: () => void;
  onNext: () => void;
  children: React.ReactNode;
};

export const FlashCardNavigation: React.FC<Props> = ({ onPrevious, onNext, children }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mr-8 bg-[#D9E6E9] rounded-2xl p-6 shadow-lg"
        onClick={onPrevious}
      >
        <ChevronLeft className="h-8 w-8 text-[#1B3B48]" />
      </motion.button>

      {children}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="ml-8 bg-[#D9E6E9] rounded-2xl p-6 shadow-lg"
        onClick={onNext}
      >
        <ChevronRight className="h-8 w-8 text-[#1B3B48]" />
      </motion.button>
    </div>
  );
};
