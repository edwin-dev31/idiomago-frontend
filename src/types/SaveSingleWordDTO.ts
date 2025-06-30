import { Visibility } from "./Visibility";

export interface SaveSingleWordDTO {
  user: number;
  word: string;
  languageCode: string;
  categoryId: number;
  description: string;
  example: string;
  visibility: Visibility
}