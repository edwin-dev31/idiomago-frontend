import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { Category } from "@/types/category";
import { ColorQueue } from "@/types/colorQueue";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { authHeaders } = useAuthStorage();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await javaAPI.get(apiRoutes.categories, {
          headers: authHeaders,
        });

        const enriched = response.data.map((cat: any, index: number) => ({
          ...cat,
          label: capitalize(cat.name),
          color: ColorQueue[index % ColorQueue.length],
        }));

        setCategories(enriched);
      } catch (error) {
        console.error("❌ Error loading categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [authHeaders]);

  return { categories, loading };
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
