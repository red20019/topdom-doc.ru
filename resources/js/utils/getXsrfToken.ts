import { authAPI } from "../api/api";

export const getXsrfToken = async () => {
  const response = await authAPI.getToken();
  return response.config.headers["X-XSRF-TOKEN"];
};