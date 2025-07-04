import React, { useEffect, useState } from "react";
import { SmilePlus } from "lucide-react";
import { useUserInfo } from "@/lib/hooks/Users/useUserInfo";
import ReactionPickerModal from "./ReactionPickerModal";
import { emojiMap, getReactionKeyByEmoji } from "@/types/reactionTypes";

interface Reaction {
  id: number;
  userId: number;
  wordTranslationId: number;
  emoji: string;
}

interface Props {
  reactions: Reaction[];
  addReaction: (emoji: string) => Promise<void>;
  deleteReaction: (reactionId: number) => Promise<void>;
}

const WordReactionsController: React.FC<Props> = ({
  reactions,
  addReaction,
  deleteReaction,
}) => {
  const { user } = useUserInfo();
  const [openModal, setOpenModal] = useState(false);
  const [userReactionId, setUserReactionId] = useState<number | null>(null);
  const [userReactionKey, setUserReactionKey] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    const myReaction = reactions.find((r) => r.userId === user.id);
    if (myReaction) {
      setUserReactionId(myReaction.id);
      const key = getReactionKeyByEmoji(myReaction.emoji);
      if (key) setUserReactionKey(key);
    } else {
      setUserReactionId(null);
      setUserReactionKey(null);
    }
  });

  const handleReaction = async (key: string) => {
    const emoji = emojiMap[key as keyof typeof emojiMap];
    if (!emoji || !user?.id) return;

    if (key === userReactionKey && userReactionId) {
      await deleteReaction(userReactionId);
    } else {
      if (userReactionId) {
        await deleteReaction(userReactionId);
      }
      await addReaction(emoji);
    }

    setOpenModal(false);
  };

  return (
    <>
      <button
        className="ml-1 text-gray-500 hover:text-blue-600"
        onClick={() => setOpenModal(true)}
        title="React"
      >
        <SmilePlus className="w-5 h-5" />
      </button>

      <ReactionPickerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onReact={handleReaction}
        currentReaction={userReactionKey || undefined}
      />
    </>
  );
};

export default WordReactionsController;
