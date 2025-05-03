import api from "./api";

export async function generateVideoFromText(text) {
  const res = await api.post("/text2video/start-generation/", { script : text });
  return res.data;
}
