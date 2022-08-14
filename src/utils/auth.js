import { v4 as uuid } from "uuid";
import { endpoints } from "../constants/endpoints";
import { executeRequest } from "./firebase";

export const generateUser = async () => {
  const generateExpired = () => {
    const date = new Date();
    return date.setDate(date.getDate() + 5);
  };
  const userId = uuid();
  const token = {
    key: uuid(),
    expired: generateExpired(),
  };
  return await addUser(userId, token);
};

const addUser = async (userId, token) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ userId, token }),
  };
  const response = await executeRequest(endpoints.auth, options);
  if (response.status === 200) {
    localStorage.setItem("nameField", response.data.name);
    return response.data;
  }
};

export const getUser = async (name) => {
  const options = {
    method: "GET",
  };
  const response = await executeRequest(`${endpoints.auth}/${name}`, options);
  if (response.status === 200) {
    return response.data;
  }
};
