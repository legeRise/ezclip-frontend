import api from "./api";

export async function generateVideoFromText(text, language, voice, resolution, style) {
  const payload = { script: text };
  if (language) payload.language = language;
  if (voice) payload.voice = voice;
  if (resolution) payload.resolution = resolution;
  if (style) payload.style = style;

  const res = await api.post("/text2video/start-generation/", payload);
  return res.data;
}

export async function recordFeedback(comment) {
  const res = await api.post("/text2video/feedback/", { comment });
  return res.data;
}


export async function getStyles() {
  const res = await api.get("/text2video/visual-styles/");
  return res.data;
}
