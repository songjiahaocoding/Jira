// No need if we use third-party authorization
import { User } from "./screens/projectList/searchPanel";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auto_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResp = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; passowrd: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResp(await resp.json());
    }
  });
};

export const register = (data: { username: string; passowrd: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResp(await resp.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorageKey);
