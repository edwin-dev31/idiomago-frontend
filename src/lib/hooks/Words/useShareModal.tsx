import { useState, useEffect } from "react";
import WordShareModal from "@/components/wordCard/WordShareModal";
import { Word } from "@/types/WordView";

const useShareModal = () => {
    const [selectedWord, setSelectedWord] = useState<Word | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (word: Word) => {
        setSelectedWord(word);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) {
            const timeout = setTimeout(() => {
                setSelectedWord(null);
                document.body.style.pointerEvents = "auto";
                document.body.style.overflow = "auto";
            }, 300); 

            return () => clearTimeout(timeout);
        }
    }, [isOpen]);


    const ShareModal = selectedWord ? (
        <WordShareModal
            word={selectedWord}
            onClose={closeModal}
            open={isOpen}
        />
    ) : null;

    return {
        openModal,
        closeModal,
        ShareModal,
    };
};

export default useShareModal;
