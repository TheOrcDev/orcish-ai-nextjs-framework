"use server";

import { CompletionModel } from "@/components/shared/types";
import { OrcishOpenAIService } from "orcish-openai-connector";

if (!process.env.OPENAI_API_KEY) {
  throw "No OpenAI API Key";
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getOpenAICompletion(
  input: string,
  model: CompletionModel
) {
  return orcishOpenAIService.getChatGPTCompletion(input, {
    gptModel: model,
  });
}

export async function getOpenAIImage(input: string) {
  return orcishOpenAIService.getDalle3Image(input);
}
