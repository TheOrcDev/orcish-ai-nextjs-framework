"use server";

import { OrcishOpenAIService } from "orcish-openai-connector";

if (!process.env.OPENAI_API_KEY) {
  throw "No OpenAI API Key";
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getOpenAICompletion(input: string) {
  return orcishOpenAIService.getChatGPTCompletion(input);
}

export async function getOpenAIImage(input: string) {
  return orcishOpenAIService.getDalle3Image(input, {
    imageResolution: "1024x1024",
  });
}
