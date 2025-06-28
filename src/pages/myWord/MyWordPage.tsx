import React, { useEffect, useState } from "react";
import WordCardPaginator from "@/components/WordCardPaginator";
import { useMyWords } from "@/lib/Hooks/Words/useMyWords";
import { Word } from "@/types/WordView";
import FilterAndSearchHeader from "@/pages/dashboard/FilterAndSearchHeader";
import {addFavorite, deleteFavorite} from "@/lib/Hooks/Favorites/useFavoriteActions";
import { changeImage } from "@/lib/Hooks/Words/useChangeImage"; 
const MyWordsPage: React.FC = () =>{
    const { words, loading } = useMyWords();
      const [localWords, setLocalWords] = useState<Word[]>([]);
      const userId = localStorage.getItem("userId");
    
      useEffect(() => {
        setLocalWords(words);
      }, [words]);
    
      const handleFavoriteToggle = async (
        wordTranslationId: number,
        isCurrentlyFavorite: boolean
      ) => {
        if (!userId) return;
    
        try {
          if (isCurrentlyFavorite) {
            await deleteFavorite(Number(userId), wordTranslationId);
          } else {
            await addFavorite(Number(userId), wordTranslationId);
          }
    
          setLocalWords((prevWords) =>
            prevWords.map((word) =>
              word.wordTranslationId === wordTranslationId
                ? { ...word, isFavorite: !isCurrentlyFavorite }
                : word
            )
          );
        } catch (error) {
          console.error("❌ Error updating favorite:", error);
        }
      };
    
      const   handleChangeImage = async (wordTranslationId: number) => {
      const newImageUrl = await changeImage(wordTranslationId);
    
      if (newImageUrl) {
        setLocalWords((prevWords) =>
          prevWords.map((word) =>
            word.wordTranslationId === wordTranslationId
              ? { ...word, imageUrl: newImageUrl }
              : word
            )
          );
        }
      };

    return(
        <>
            <FilterAndSearchHeader/>
            <h2 className="text-xl font-semibold text-[#1B3B48] dark:text-white mb-4">
                Words in all languages
            </h2>

            {loading ? (
                <p className="text-gray-500">Loading words...</p>
            ) : localWords.length === 0 ? (
                <p className="text-gray-500">No words available.</p>
            ) : (
                <WordCardPaginator
                words={localWords}
                onFavoriteToggle={handleFavoriteToggle}
                onChangeImage={handleChangeImage}
                />
            )}
        </>
    )
}

export default MyWordsPage;