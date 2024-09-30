import Cookies from "js-cookie";
import { EventEmitter } from "eventemitter3";
import { jwtDecode } from "jwt-decode";
import { AuthenticationState } from "../../types/authentication-state";

interface AuthEvents {
  login: (jwt: string) => void;
  logout: () => void;
}

export const authEventEmitter = new EventEmitter<AuthEvents>();

export function setToken(token: string) {
  Cookies.set("token", token, { expires: 7 });
  authEventEmitter.emit("login", token);
}

export function hasValidToken() {
  const token = getToken();
  if (!token) {
    return false;
  }
  const exp = jwtDecode<{ exp: number }>(token).exp;
  return exp * 1000 > Date.now();
}

export function getToken() {
  const token = Cookies.get("token");
  return token;
}

// const userIdCache = { token: "", userId: "" };

const notAuthenticated: AuthenticationState = { isAuthenticated: false };
export function getAuthState(): AuthenticationState {
  try {
    const isValid = hasValidToken();
    const token = getToken();
    if (!isValid || !token) {
      throw new Error("no token found");
    }

    const userId = jwtDecode<{ id: string }>(token).id;
    console.log("userid", userId);
    if (!userId) {
      throw new Error("no user id found");
    }

    return {
      isAuthenticated: true,
      token,
      userId,
    };
  } catch (e) {
    return notAuthenticated;
  }
}

// export function getUserId() {
//   const token = Cookies.get("token");
//   if (!token) {
//     return undefined;
//   }
//   if (userIdCache.token === token) {
//     return userIdCache.userId;
//   }
//   const userId = jwtDecode<{ id: string }>(token).id;
//   userIdCache.token = token;
//   userIdCache.userId = userId;
//   return userId;
// }

export function logout() {
  Cookies.remove("token");
  authEventEmitter.emit("logout");
}
