import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { Category } from "@/types/category";
import { ColorQueue } from "@/types/colorQueue";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await javaAPI.get("/api/category", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📦 Categorías recibidas:", response.data);

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
  }, []);

  return { categories, loading };
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
