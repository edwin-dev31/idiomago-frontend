import { javaAPI } from "@/lib/axios";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { Word } from "@/types/WordView";

export function useWordFilter() {
  const { authHeaders } = useAuthStorage();

  const filterSingle = async (url: string): Promise<Word[]> => {
    try {
      const response = await javaAPI.get(url, { headers: authHeaders });
      return response.data;
    } catch (err) {
      console.error(`❌ Error filtering from: ${url}`, err);
      return [];
    }
  };

  const filterMultiple = async (urls: string[]): Promise<Word[]> => {
    const results: Word[] = [];

    for (const url of urls) {
      try {
        const response = await javaAPI.get(url, { headers: authHeaders });
        results.push(...response.data);
      } catch (err) {
        console.error(`❌ Error filtering from: ${url}`, err);
      }
    }

    return results;
  };

  return {
    filterSingle,
    filterMultiple,
  };
}
