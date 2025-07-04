// src/lib/hooks/Words/useWordFooters.ts

import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { WordFooter } from "@/types/WordFooter";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";

export function useWordFooters() {
  const [footers, setFooters] = useState<WordFooter[]>([]);
  const [loading, setLoading] = useState(true);

  const { authHeaders } = useAuthStorage();

  useEffect(() => {
    const fetchFooters = async () => {
      try {
        const response = await javaAPI.get(apiRoutes.view.wordFooter, {
          headers: authHeaders,
        });
        console.log(response);
        setFooters(response.data);
      } catch (err) {
        console.error("❌ Error fetching word footers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooters();
  }, [authHeaders]);

  return { footers, loading };
}
