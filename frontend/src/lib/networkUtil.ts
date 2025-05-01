import { setLocalData, getCookies } from "./deviceUtil.ts";

export const currentJWTToken = () => getCookies()["jwttoken"];

export const getHeaders = async () => {
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${currentJWTToken(document.cookie)}`,
  };
};

export const updateJWTAuth = async () => {
  const response = await fetch("http://localhost:3000/api/authCookie", {
    method: "POST",
    headers: await getHeaders(),
  });
  const result = await response.json();

  await setLocalData({
    timestamp: new Date().toISOString(),
    username: result.username,
    channels: result.channels,
  });

  return result.status;
};