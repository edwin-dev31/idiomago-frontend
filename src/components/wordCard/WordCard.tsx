import React from "react";
import { Heart, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Word } from "@/types/WordView";
import WordCardFooterManager from "./WordCardFooterManager";
import WordCardOptionsDropdown from "./WordCardOptionsDropdown";
import { deleteTranslation } from "@/lib/hooks/Words/useWordEdit";
import useShareModal from "@/lib/hooks/Words/useShareModal";
import useEditModal from "@/lib/hooks/Words/useEditModal";

interface WordCardProps {
  word: Word;
  onFavoriteToggle: (id: number) => void;
  onChangeImage: () => void;
  onDelete: () => void;
  onUpdate: (updated: Word) => void;
  width?: number;
  height?: number;
  hideShape?: boolean;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  onFavoriteToggle,
  onChangeImage,
  onDelete,
  onUpdate,
  width,
  height,
  hideShape
}) => {
  const { openModal: openShareModal, ShareModal } = useShareModal();
  const { openModal: openEditModal, EditModal } = useEditModal();

  const handleDeleteCard = async () => {
    try {
      await deleteTranslation(word.wordTranslationId);
      onDelete();
    } catch (err) {
      console.error("❌ Failed to delete word card:", err);
    }
  };

  return (
    <>
      <motion.div
        id={`word-card-${word.wordTranslationId}`}
        whileHover={{ scale: 1.02 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden dark:bg-white h-full"
      >
        <div className="relative">
          <img
            alt="Word illustration"
            className="w-full h-40 md:h-48 object-cover"
            src={
              word.imageUrl ||
              "https://images.unsplash.com/photo-1613235527857-bf2d37e5b350"
            }
          />

          {!hideShape && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4">
              <WordCardOptionsDropdown
                onChangeImage={onChangeImage}
                onEditTranslation={() => openEditModal(word, onUpdate)}
                onDeleteCard={handleDeleteCard}
                onShare={openShareModal}
                word={word}
              />
            </div>
          )}

          <div className="absolute top-2 right-2 md:top-4 md:right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFavoriteToggle(word.wordId)}
            >
              <Heart
                className={`h-5 w-5 md:h-6 md:w-6 ${word.isFavorite ? "fill-red-500 text-red-500" : "text-white"
                  }`}
              />
            </Button>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-2 md:mb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-900">
              {word.translatedWord.toUpperCase()}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="bg-blue-100 rounded-full"
              onClick={() => {
                // Aquí podrías agregar funcionalidad de Text-to-Speech
              }}
            >
              <Volume2 className="h-4 w-4 md:h-5 md:w-5 text-blue-900" />
            </Button>
          </div>

          <div className="space-y-2 md:space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-blue-900">
                Description
              </h4>
              <p className="text-gray-700 text-sm">{word.translatedDescription}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-blue-900">Example:</h4>
              <p className="text-gray-700 italic text-xs md:text-sm">{word.translatedExample}</p>
            </div>
          </div>
        </div>

        <div className="mb-2 md:mb-4">
          <WordCardFooterManager word={word} />
        </div>
      </motion.div>

      {ShareModal}
      {EditModal}
    </>
  );
};

export default WordCard;
