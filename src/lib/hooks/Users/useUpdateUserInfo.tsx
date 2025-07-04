import { javaAPI } from "@/lib/axios";
import { apiRoutes } from "@/lib/constants/apiRoutes";
import { useAuthStorage } from "@/lib/hooks/useAuthStorage";

type PartialUserUpdateDTO = {
  username?: string;
  email?: string;
  password?: string;
};

export function useUpdateUserInfo() {
  const { userId, authHeaders } = useAuthStorage();

  const updateUserInfo = async (data: PartialUserUpdateDTO) => {
    if (!userId) throw new Error("User ID not found");

    const response = await javaAPI.put(apiRoutes.users.byId(userId), data, {
      headers: authHeaders,
    });

    return response.data;
  };

  return { updateUserInfo };
}
