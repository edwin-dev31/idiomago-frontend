import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { SmilePlus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import WordShareModal from "@/components/wordCard/WordShareModal";
import { Word } from "@/types/WordView";

interface Props {
  reactions: {
    like: number;
    dislike: number;
    love: number;
    fire: number;
    perfect: number;
  };
  word: Word;
  hideShare?: boolean;
}

const emojiMap = [
  { emoji: "👍", key: "like" },
  { emoji: "👎", key: "dislike" },
  { emoji: "❤️", key: "love" },
  { emoji: "🔥", key: "fire" },
  { emoji: "💯", key: "perfect" },
];

const WordCardFooterActions: React.FC<Props> = ({
  reactions,
  word,
  hideShare,
}) => {
  const [openShare, setOpenShare] = useState(false);
  const [openReactions, setOpenReactions] = useState(false);

  const topReactions = emojiMap
    .map(({ emoji, key }) => ({
      emoji,
      count: reactions[key as keyof typeof reactions] || 0,
    }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const handleReact = (reactionKey: string) => {
    console.log("➡️ Usuario eligió reacción:", reactionKey);
    // Aquí luego llamaremos a un hook para guardar en backend
    setOpenReactions(false);
  };

  return (
    <>
      <div className="flex flex-col items-center text-gray-500 text-sm">

        {/* Botón para compartir */}
        {!hideShare && (
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
            onClick={() => setOpenShare(true)}
          >
            <FaShareAlt className="text-xl" />
            <span className="text-xs">Share</span>
          </div>
        )}

        {/* Reacciones visibles + botón */}
        <div className="flex gap-2 mt-3 items-center">
          {/* Top 3 emojis */}
          {topReactions.map(({ emoji }) => (
            <span key={emoji} className="text-xl">{emoji}</span>
          ))}

          {/* Botón para abrir modal */}
          <button
            className="ml-1 text-gray-500 hover:text-blue-600"
            onClick={() => setOpenReactions(true)}
            title="Reaccionar"
          >
            <SmilePlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal de emojis tipo WhatsApp */}
      <Dialog open={openReactions} onOpenChange={setOpenReactions}>
        <DialogContent className="max-w-fit p-2 bg-black text-white rounded-full flex gap-2">
          {emojiMap.map(({ emoji, key }) => (
            <button
              key={key}
              onClick={() => handleReact(key)}
              className="text-2xl hover:scale-125 transition-transform"
              title={key}
            >
              {emoji}
            </button>
          ))}
        </DialogContent>
      </Dialog>

      {/* Modal de compartir */}
      {openShare && (
        <WordShareModal
          word={word}
          onClose={() => setOpenShare(false)}
        />
      )}
    </>
  );
};

export default WordCardFooterActions;
