export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const authHeaders = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  return {
    token,
    userId,
    authHeaders,
  };
}
