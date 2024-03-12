import { OrcishOpenAIService } from "orcish-openai-connector";

import { CompletionModel, ImageModel } from "@/components/shared/types";

if (!process.env.OPENAI_API_KEY) {
  throw "No OpenAI API Key";
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
});

import { router, publicProcedure } from "../trpc";
import { z } from "zod";
export const gptRouter = router({
  completion: publicProcedure
    .input(
      z.object({ prompt: z.string(), model: z.nativeEnum(CompletionModel) })
    )
    .query(async (opts) => {
      const { input } = opts;
      if (input.prompt === "") return;
      const result = await orcishOpenAIService.getChatGPTCompletion(
        input.prompt,
        {
          gptModel: input.model,
        }
      );
      return result;
    }),
  image: publicProcedure
    .input(z.object({ prompt: z.string(), model: z.nativeEnum(ImageModel) }))
    .query(async (opts) => {
      const { input } = opts;
      if (input.prompt === "") return;
      return orcishOpenAIService.getDalle3Image(input.prompt, {
        imageModel: input.model,
      });
    }),
});
