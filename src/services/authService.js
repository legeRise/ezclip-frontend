import api from "./api";

export async function signup(email, password, confirm_password) {
  const res = await api.post("/auth/users/", { email: email, password: password, re_password: confirm_password }, { skipAuth: true });
  return res.data;
}

export async function login(email, password) {
  const res = await api.post("/auth/jwt/create", { email: email, password: password }, { skipAuth: true });
  return res.data;
}

export async function activateAccount(uid, token) {
  const res = await api.post("/auth/users/activation/", { uid, token }, { skipAuth: true });
  return res.data;
}

export async function getUserInfo() {
  const res = await api.get("/auth/users/me/");
  return res.data;
}

