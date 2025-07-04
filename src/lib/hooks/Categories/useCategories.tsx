import { useEffect, useState, useCallback } from "react";
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { Category } from "@/types/category";
import { ColorQueue } from "@/types/colorQueue";
import toast from "react-hot-toast";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { authHeaders } = useAuthStorage();

  // 👇 encapsulamos la lógica de carga para poder reutilizarla
  const fetchCategories = useCallback(async () => {
    setLoading(true);
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
  }, [authHeaders]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    refetchCategories: fetchCategories,
  };
}

export function useSaveCategory() {
  const [loading, setLoading] = useState(false);
  const { authHeaders } = useAuthStorage();

  const saveCategory = async (name: string): Promise<Category | null> => {
    setLoading(true);
    try {
      const response = await javaAPI.post(
        apiRoutes.categories,
        { name },
        { headers: authHeaders }
      );
      toast.success("Category Saved");
      return response.data as Category;
    } catch (error) {
      console.error("❌ Error saving category:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { saveCategory, loading };
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
