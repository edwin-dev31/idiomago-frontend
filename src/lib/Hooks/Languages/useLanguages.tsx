import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { Language } from "@/types/language";
import { ColorQueue } from "@/types/colorQueue";


export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await javaAPI.get("/api/language", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📦 Idiomas recibidos:", response.data);

        const enriched = response.data.map((lang: any, index: number) => ({
          ...lang,
          label: capitalize(lang.name),
          color: ColorQueue[index % ColorQueue.length],
        }));

        setLanguages(enriched);
      } catch (error) {
        console.error("❌ Error loading languagues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, loading };
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
