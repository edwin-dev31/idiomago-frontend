// src/lib/hooks/Words/useEditModal.ts
import { useState, useEffect } from "react";
import { Word } from "@/types/WordView";
import EditTranslationModal from "@/components/wordCard/EditTranslationModal";

const useEditModal = () => {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [onUpdate, setOnUpdate] = useState<((updated: Word) => void) | undefined>(undefined);


  const openModal = (word: Word, onUpdateFn: (updated: Word) => void) => {
    setSelectedWord(word);
    setOnUpdate(() => onUpdateFn); // almacenamos la función de update
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setSelectedWord(null);
        setOnUpdate(undefined);
        document.body.style.pointerEvents = "auto";
        document.body.style.overflow = "auto";
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const EditModal = selectedWord ? (
    <EditTranslationModal
      word={selectedWord}
      open={isOpen}
      onClose={closeModal}
      onUpdate={onUpdate}
    />
  ) : null;

  return {
    openModal,
    closeModal,
    EditModal,
  };
};

export default useEditModal;
