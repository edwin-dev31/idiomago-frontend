import { useEffect, useState } from "react";
import { addReaction, deleteReaction, getReactionsByWord } from "@/lib/hooks/Reactions/useReactions";

export function useReactions(wordTranslationId: number) {
  const [reactions, setReactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReactions = async () => {
    setLoading(true);
    const data = await getReactionsByWord(wordTranslationId);
    setReactions(data);
    setLoading(false);
  };

  useEffect(() => {
    if (wordTranslationId) fetchReactions();
  }, [wordTranslationId]);

  const handleAdd = async (emoji: string) => {
    await addReaction(wordTranslationId, emoji);
    fetchReactions();
  };

  const handleDelete = async (reactionId: number) => {
    await deleteReaction(reactionId);
    fetchReactions();
  };

  return {
    reactions,
    loading,
    addReaction: handleAdd,
    deleteReaction: handleDelete,
  };
}
