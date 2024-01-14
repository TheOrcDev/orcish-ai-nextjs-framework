"use server";

import { OrcishOpenAIService } from "orcish-openai-connector";

if (!process.env.GPT_API_KEY) {
  throw "No OpenAI API Key";
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.GPT_API_KEY,
});

export async function getChatGPTCompletion(input: string) {
  return orcishOpenAIService.getChatGPTCompletion(input);
}
