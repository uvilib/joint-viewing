import { endpoints } from "../constants/endpoints";

export const executeRequest = async (path = "", options = {}) => {
  const response = await fetch(`${endpoints.firebase}/${path}.json`, options);
  const data = await response.json();
  const status = response.status;
  return { data, status };
};
