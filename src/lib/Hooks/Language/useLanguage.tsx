import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";

interface Language {
  id: number;
  name: string;
  code: string;
  label?: string;
  color?: string;
}

export const colorQueue = [
  "#8DB7C1", "#5DCAD1", "#7B88C8", "#A2D2FF", "#B5CDA3",
  "#F4A261", "#E76F51", "#9A8C98", "#F6BD60", "#CDB4DB"
];

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
          color: colorQueue[index % colorQueue.length],
        }));

        setLanguages(enriched);
      } catch (error) {
        console.error("❌ Error cargando idiomas:", error);
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
