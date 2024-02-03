"use server";

import { OrcishOpenAIService } from "orcish-openai-connector";

if (!process.env.OPENAI_API_KEY) {
  throw "No OpenAI API Key";
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getOpenAICompletion(input: string) {
  return orcishOpenAIService.getChatGPTCompletion(input, {
    gptModel: "gpt-4",
  });
}

export async function getOpenAIImage(input: string) {
  return orcishOpenAIService.getDalle3Image(input);
}
