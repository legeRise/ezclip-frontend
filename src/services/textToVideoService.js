import api from "./api";

export async function generateVideoFromText(text, language, voice, resolution, style, template, experimental) {
  const payload = { script: text };
  if (language) payload.language = language;
  if (voice) payload.voice = voice;
  if (resolution) payload.resolution = resolution;
  if (style) payload.style = style;
  if (template) payload.template = template;
  if (experimental === true) payload.use_ezclip_assets = true;


  const res = await api.post("/text2video/start-generation/", payload);
  return res;
}

export async function recordFeedback(comment) {
  const res = await api.post("/text2video/feedback/", { comment });
  return res.data;
}


export async function getStyles() {
  const res = await api.get("/text2video/visual-styles/");
  return res.data;
}

export async function getTemplates() {
  const res = await api.get("/text2video/story-templates/");
  return res.data;
}

export async function getFeedbackList(limit, offset) {
  const params = {};

  if (limit != null) params.limit = limit;
  if (offset != null) params.offset = offset;

  const res = await api.get("/text2video/list-feedbacks/", { params });
  return res;
}

