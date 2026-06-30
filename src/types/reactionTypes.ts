import { ThumbsUp, ThumbsDown, Heart, Flame, CheckCheck, type LucideIcon } from "lucide-react";

export type ReactionKey = "like" | "dislike" | "love" | "fire" | "perfect";

export interface ReactionType {
  key: ReactionKey;
  emoji: string;
  Icon: LucideIcon;
}

export const reactionTypes: ReactionType[] = [
  { key: "like", emoji: "👍", Icon: ThumbsUp },
  { key: "dislike", emoji: "👎", Icon: ThumbsDown },
  { key: "love", emoji: "❤️", Icon: Heart },
  { key: "fire", emoji: "🔥", Icon: Flame },
  { key: "perfect", emoji: "💯", Icon: CheckCheck },
];

export const emojiMap: Record<ReactionKey, string> = Object.fromEntries(
  reactionTypes.map(({ key, emoji }) => [key, emoji])
) as Record<ReactionKey, string>;

export function getReactionKeyByEmoji(emoji: string): ReactionKey | undefined {
  return reactionTypes.find((r) => r.emoji === emoji)?.key;
}
