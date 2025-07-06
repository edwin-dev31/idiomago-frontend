import React from "react";
import { Word } from "@/types/WordView";
import WordReactionsController from "./WordReactionsController";
import { useReactions } from "@/lib/hooks/Reactions/useReactionsManager";
import { reactionTypes } from "@/types/reactionTypes";

interface Props {
  word: Word;
  hideReactions?: boolean;
}

const WordCardFooterActions: React.FC<Props> = ({ word, hideReactions }) => {
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
    <div className="flex gap-1 mt-2 items-center">
      {!hideReactions && (
        <>
          <div className="flex -space-x-1">
            {topReactions.map(({ emoji }) => (
              <span
                key={emoji}
                className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-300 font-emoji text-[14px] leading-none relative"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {emoji}
                </span>
              </span>
            ))}
          </div>

          {totalCount > 0 && (
            <span className="text-sm text-gray-600 ml-2 font-medium">
              {Intl.NumberFormat("en", { notation: "compact" }).format(totalCount)}
            </span>
          )}
        </>
      )}

      {/* Este siempre se muestra */}
      <WordReactionsController
        reactions={reactions}
        addReaction={addReaction}
        deleteReaction={deleteReaction}
      />
    </div>
  );
};

export default WordCardFooterActions;
