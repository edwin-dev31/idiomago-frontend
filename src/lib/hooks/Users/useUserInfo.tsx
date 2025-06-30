import { useEffect, useState } from "react";
import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";
import { User } from "@/types/user";

export function useUserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { userId, authHeaders } = useAuthStorage();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const response = await javaAPI.get(apiRoutes.users.byId(userId), {
          headers: authHeaders,
        });

        setUser(response.data);
      } catch (error) {
        console.error("❌ Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, authHeaders]);

  return { user, loading };
}
