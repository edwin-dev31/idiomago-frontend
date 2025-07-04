import React from "react";
import { useWordFooters } from "@/lib/hooks/Words/useWordFooters";
import WordCardFooterInfo from "./WordCardFooterInfo";
import WordCardFooterActions from "./WordCardFooterActions";
import { Word } from "@/types/WordView";
interface Props {
  word: Word;
  hideShare?: boolean;
}

const WordCardFooterManager: React.FC<Props> = ({ word, hideShare }) => {
  const { footers, loading } = useWordFooters();

  if (loading) return null;

  const footer = footers.find(f => f.wordTranslationId === word.wordTranslationId);

  if (!footer) return null;

  return (
    <div className="border-t pt-3 px-6 flex items-center justify-between">
      <WordCardFooterInfo
        imageUrl={footer.imageUrl}
        username={footer.username}
        language={word.languageName}
        postedAt={formatPostedAt(footer.createdAt)}
      />
      <WordCardFooterActions
        reactions={{
          like: footer.reactionLike,
          dislike: footer.reactionDislike,
          love: footer.reactionLove,
          fire: footer.reactionFire,
          perfect: footer.reactionPerfect,
        }}
        word={word}
        hideShare={hideShare}
      />
    </div>
  );
};

function formatPostedAt(dateString: string): string {
  const postedDate = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - postedDate.getTime()) / 1000;

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default WordCardFooterManager;
