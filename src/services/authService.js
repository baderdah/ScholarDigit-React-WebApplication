import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/authenticate";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  console.log("login");
  const { data: jwt } = await http.post(apiEndpoint, {
    userName: email,
    password
  });
  console.log("login", jwt);
  localStorage.setItem(tokenKey, jwt.jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {}
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
};
export default auth;
