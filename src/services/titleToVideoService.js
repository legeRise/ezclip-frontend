import api from "./api";

export async function generateVideoFromTitle(title) {
  const res = await api.post("/top5video/start-generation/", { title });
  return res.data;
}


