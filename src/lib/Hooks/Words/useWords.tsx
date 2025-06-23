import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";

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
}

export function useWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await javaAPI.get("/api/view", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWords(response.data);
      } catch (err) {
        console.error("❌ Error fetching words:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  return { words, loading };
}
