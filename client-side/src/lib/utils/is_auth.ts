import { getCookie } from "cookies-next";

export function isAuth() {
  const auth_token = getCookie("auth_token");
  if (!auth_token) {
    return false;
  }
  return true;
}
