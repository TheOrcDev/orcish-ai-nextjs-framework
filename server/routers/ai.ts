import * as fs from "fs";
import { OrcishOpenAIService } from "orcish-openai-connector";
import path from "path";
import { z } from "zod";

import {
  CompletionModel,
  ImageModel,
  Resolution,
  Voice,
  VoiceModel,
} from "@/components/shared/types";

import { createFileName } from "@/lib/utils";
import { publicProcedure, router } from "../trpc";

if (!process.env.OPENAI_API_KEY) {
  throw "No OpenAI API Key";
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiRouter = router({
  completion: publicProcedure
    .input(
      z.object({ prompt: z.string(), model: z.nativeEnum(CompletionModel) })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      try {
        const result = await orcishOpenAIService.getChatGPTCompletion(
          input.prompt,
          {
            gptModel: input.model,
          }
        );

        return result;
      } catch (e) {
        throw (e);
      }
    }),
  image: publicProcedure
    .input(z.object({ prompt: z.string(), model: z.nativeEnum(ImageModel), resolution: z.nativeEnum(Resolution) }))
    .mutation(async (opts) => {
      const { input } = opts;

      try {
        const image = await orcishOpenAIService.getDalle3Image(input.prompt, {
          imageModel: input.model,
          imageResolution: input.resolution
        });

        return image;
      } catch (e) {
        throw (e);
      }
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

      try {
        const sound = await orcishOpenAIService.textToSpeech(input.prompt, {
          voiceModel: input.model,
          voice: input.voice,
        });

        const fileName = createFileName(input.prompt);

        // TODO: save all text to voice files on cloud (supabase or something else)
        const outputPath = `/tts/${fileName}.mp3`;
        const _output = path.resolve(outputPath);

        const soundBuffer = await sound.arrayBuffer();
        const buffer = Buffer.from(soundBuffer);
        await fs.promises.writeFile(`./public/${_output}`, buffer);

        return outputPath;
      } catch (e) {
        throw (e);
      }
    }),
});
