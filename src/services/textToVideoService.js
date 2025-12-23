import api from "./api";

export async function generateVideoFromText(text, ttsService, language, voice, resolution, style, template, experimental) {
  const payload = { script: text };
  
  // TTS service (defaults to 'edge' on backend if not provided)
  if (ttsService) payload.tts_service = ttsService;
  
  // Language is only used with Edge TTS
  if (ttsService === 'edge' && language) payload.language = language;
  
  if (voice) payload.voice = voice;
  if (resolution) payload.resolution = resolution;
  if (style) payload.style = style;
  if (template) payload.template = template;
  if (experimental === true) payload.use_ezclip_assets = true;

  const res = await api.post("/text2video/start-generation/", payload);
  return res;
}

// Fetch available TTS services (Edge TTS, Kokoro TTS, etc.)
export async function getTtsServices() {
  const res = await api.get("/text2video/tts/services/");
  return res.data.services || [];
}

// Fetch voices for a specific TTS service
// For Kokoro: no language needed
// For Edge: language parameter is required
export async function getTtsVoices(service, language = null) {
  const url = language 
    ? `/text2video/tts/voices/${service}/${language}/`
    : `/text2video/tts/voices/${service}/`;
  const res = await api.get(url);
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

