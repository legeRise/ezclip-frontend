import api from "./api";

export async function generateVideoFromText(text, language, voice) {
  const payload = { script: text };
  if (language) payload.language = language;
  if (voice) payload.voice = voice;
  const res = await api.post("/text2video/start-generation/", payload);
  return res.data;
}
