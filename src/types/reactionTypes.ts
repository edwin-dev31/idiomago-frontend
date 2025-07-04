export type ReactionKey = "like" | "dislike" | "love" | "fire" | "perfect";

export interface ReactionType {
  key: ReactionKey;
  emoji: string;
}

export const reactionTypes: ReactionType[] = [
  { key: "like", emoji: "👍" },
  { key: "dislike", emoji: "👎" },
  { key: "love", emoji: "❤️" },
  { key: "fire", emoji: "🔥" },
  { key: "perfect", emoji: "💯" },
];

export const emojiMap: Record<ReactionKey, string> = Object.fromEntries(
  reactionTypes.map(({ key, emoji }) => [key, emoji])
) as Record<ReactionKey, string>;

export function getReactionKeyByEmoji(emoji: string): ReactionKey | undefined {
  return reactionTypes.find((r) => r.emoji === emoji)?.key;
}
