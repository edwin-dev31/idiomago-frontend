import useWordsFromEndpoint from "./useWordsFromEndpoint";
import { apiRoutes } from "@/lib/constants/apiRoutes";

export function useWords() {
  return useWordsFromEndpoint(apiRoutes.view.allWords);
}

export function useWordsTFavorite() {
  return useWordsFromEndpoint(apiRoutes.view.favoriteWords);
}
