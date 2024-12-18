import OpenAI from "openai"



export const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
  baseURL: "https://api.x.ai/v1"
})
