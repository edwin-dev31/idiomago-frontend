import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import WordShareModal from "@/components/wordCard/WordShareModal";
import { Word } from "@/types/WordView";
import WordReactionsController from "./WordReactionsController";
import { useReactions } from "@/lib/hooks/Reactions/useReactionsManager";
import { reactionTypes } from "@/types/reactionTypes";



interface Props {
  word: Word;
  hideShare?: boolean;
}


const WordCardFooterActions: React.FC<Props> = ({ word, hideShare }) => {
  const [openShare, setOpenShare] = useState(false);
  const { reactions, addReaction, deleteReaction } = useReactions(word.wordTranslationId);

  const topReactions = reactionTypes
    .map(({ emoji }) => ({
      emoji,
      count: reactions.filter((r) => r.emoji === emoji).length,
    }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const totalCount = reactions.length;

  return (
    <>
      <div className="flex flex-col items-center text-gray-500 text-sm pt-2">
        {!hideShare && (
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
            onClick={() => setOpenShare(true)}
          >
            <FaShareAlt className="text-xl" />
            <span className="text-xs">Share</span>
          </div>
        )}

        <div className="flex gap-1 mt-2 items-center">
          <div className="flex -space-x-1">
            {topReactions.map(({ emoji }) => (
              <span
                key={emoji}
                className="text-lg bg-white rounded-full shadow-sm px-[2px] border border-gray-300"
              >
                {emoji}
              </span>
            ))}
          </div>

          {totalCount > 0 && (
            <span className="text-sm text-gray-600 ml-2 font-medium">
              {Intl.NumberFormat("en", { notation: "compact" }).format(totalCount)}
            </span>
          )}

          <WordReactionsController
            reactions={reactions}
            addReaction={addReaction}
            deleteReaction={deleteReaction}
          />
        </div>
      </div>

      {openShare && <WordShareModal word={word} onClose={() => setOpenShare(false)} />}
    </>
  );
};

export default WordCardFooterActions;
