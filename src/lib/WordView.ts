export interface Word {
  wordTranslationId: number;
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
}