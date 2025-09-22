import api from "./api";

export async function signup(email, password, confirm_password) {
  const res = await api.post("/auth/users/", { email: email, password: password, re_password: confirm_password }, { skipAuth: true });
  return res.data;
}

export async function login(email, password) {
  const res = await api.post("/auth/jwt/create", { email: email, password: password }, { skipAuth: true });
  return res.data;
}

export async function signInWithGoogle(credential) {
  const res = await api.post("/auth/login-with-google/", { id_token : credential }, { skipAuth: true });
  return res.data;
}

export async function activateAccount(uid, token) {
  const res = await api.post("/auth/users/activation/", { uid, token }, { skipAuth: true });
  return res.data;
}

export async function resendActivationEmail(email) {
  const res = await api.post("/auth/users/resend_activation/", { email }, { skipAuth: true });
  return res.data;
}

export async function changePassword(current_password, new_password, re_new_password) {
  const res = await api.post("/auth/users/set_password/", { current_password, new_password, re_new_password });
  return res.data;
}

export async function requestPasswordReset(email) {
  const res = await api.post("/auth/users/reset_password/", { email }, { skipAuth: true });
  return res.data;
}

export async function confirmPasswordReset(uid, token, new_password, re_new_password) {
  const res = await api.post("/auth/users/reset_password_confirm/", { uid, token, new_password, re_new_password }, { skipAuth: true });
  return res.data;
}

export async function getUserInfo() {
  const res = await api.get("/auth/users/me/");
  return res.data;
}

