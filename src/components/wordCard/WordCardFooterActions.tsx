import React from "react";
import { Word } from "@/types/WordView";
import WordReactionsController from "./WordReactionsController";
import { useReactions } from "@/lib/hooks/Reactions/useReactionsManager";
import { reactionTypes } from "@/types/reactionTypes";

interface Props {
  word: Word;
}

const WordCardFooterActions: React.FC<Props> = ({ word }) => {
  
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
    </>
  );
};

export default WordCardFooterActions;
