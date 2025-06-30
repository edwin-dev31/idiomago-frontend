import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { Language } from "@/types/language";
import { ColorQueue } from "@/types/colorQueue";

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const { authHeaders } = useAuthStorage();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await javaAPI.get(apiRoutes.languages, {
          headers: authHeaders,
        });

        const enriched = response.data.map((lang: any, index: number) => ({
          ...lang,
          label: capitalize(lang.name),
          color: ColorQueue[index % ColorQueue.length],
        }));

        setLanguages(enriched);
      } catch (error) {
        console.error("❌ Error loading languages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [authHeaders]);

  return { languages, loading };
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
