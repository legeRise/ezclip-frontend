import api from "./api";

export async function generateVideoFromText(text, language, voice, resolution) {
  const payload = { script: text };
  if (language) payload.language = language;
  if (voice) payload.voice = voice;
  if (resolution) payload.resolution = resolution;

  const res = await api.post("/text2video/start-generation/", payload);
  return res.data;
}

export async function recordFeedback(comment) {
  const res = await api.post("/text2video/feedback/", { comment });
  return res.data;
}
