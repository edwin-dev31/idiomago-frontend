import { Visibility } from "./Visibility";

export interface Word {
  wordTranslationId: number;
  userId: number;
  wordId: number;
  originalWord: string;
  languageId: number;
  translatedWord: string;
  translatedExample: string;
  translatedDescription: string;
  imageUrl: string | null;
  audioUrl: string | null;
  createdAt: string;
  languageName: string;
  isFavorite: boolean;
  visibility: Visibility;
}

