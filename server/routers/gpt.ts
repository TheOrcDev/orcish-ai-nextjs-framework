import { OrcishOpenAIService } from "orcish-openai-connector";
import * as fs from "fs";

import {
  CompletionModel,
  ImageModel,
  Voice,
  VoiceModel,
} from "@/components/shared/types";

if (!process.env.OPENAI_API_KEY) {
  throw "No OpenAI API Key";
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
});

import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import path from "path";
export const gptRouter = router({
  completion: publicProcedure
    .input(
      z.object({ prompt: z.string(), model: z.nativeEnum(CompletionModel) })
    )
    .query(async (opts) => {
      const { input } = opts;
      if (input.prompt === "") return "";
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
      if (input.prompt === "") return "";
      return orcishOpenAIService.getDalle3Image(input.prompt, {
        imageModel: input.model,
      });
    }),
  voice: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
        model: z.nativeEnum(VoiceModel),
        voice: z.nativeEnum(Voice),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const sound = await orcishOpenAIService.textToSpeech(input.prompt, {
        voiceModel: input.model,
        voice: input.voice,
      });
      const outputPath = "/tts/output.mp3";
      const _output = path.resolve(outputPath);

      const soundBuffer = await sound.arrayBuffer();
      const buffer = Buffer.from(soundBuffer);
      await fs.promises.writeFile(`./public/${_output}`, buffer);
    }),
});
