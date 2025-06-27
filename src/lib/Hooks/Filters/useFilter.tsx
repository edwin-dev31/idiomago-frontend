// src/lib/Hooks/Filter/useFilter.ts
import { javaAPI } from "@/lib/axios";
import { Word } from "@/lib/WordView";

const token = localStorage.getItem("token");

export function useFilterByLanguage() {
  const filter = async (codes: string[]): Promise<Word[]> => {
    const results: Word[] = [];

    for (const code of codes) {
      try {
        const response = await javaAPI.get(`/api/view/search/lang/${code}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        results.push(...response.data);
      } catch (err) {
        console.error(`Error filtering by language: ${code}`, err);
      }
    }

    return results;
  };

  return { filter };
}

export function useFilterByCategories() {
  const filter = async (category: number): Promise<Word[]> => {
    try {
      const response = await javaAPI.get(`/api/view/search/categories/${category}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.error("Error filtering by category:", err);
      return [];
    }
  };

  return { filter };
}

export function useFilterByDescription() {
  const filter = async (partial: string): Promise<Word[]> => {
    try {
        const response = await javaAPI.get(`/api/view/search/description/${partial}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.error("Error filtering by definition:", err);
      return [];
    }
  };

  return { filter };
}

export function useFilterByExample() {
  const filter = async (partial: string): Promise<Word[]> => {
    try {
      const response = await javaAPI.get(`/api/view/search/example/${partial}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.error("Error filtering by example:", err);
      return [];
    }
  };

  return { filter };
}
