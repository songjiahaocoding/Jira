// No need if we use third-party authorization
import { User } from "./screens/projectList/searchPanel";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResp = ({ user }: { user: User }) => {
  console.log("set item as " + user.token);
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResp(await resp.json());
    } else {
      return Promise.reject(await resp.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResp(await resp.json());
    } else {
      return Promise.reject(await resp.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
