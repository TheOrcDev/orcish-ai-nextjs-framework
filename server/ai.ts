"use server";

import { openai } from "@ai-sdk/openai";
import { currentUser } from "@clerk/nextjs/server";
import { experimental_generateImage as generateImage, generateText } from "ai";
import * as fs from "fs";
import { OrcishOpenAIService } from "orcish-openai-connector";
import path from "path";

import {
  CompletionModel,
  ImageModel,
  Resolution,
  Voice,
  VoiceModel,
} from "@/components/shared/types";
import db from "@/db/drizzle";
import { tokenSpends } from "@/db/schema";
import { getTotalTokens } from "@/lib/queries";
import { createFileName } from "@/lib/utils";

if (!process.env.OPENAI_API_KEY) {
  throw "No OpenAI API Key";
}

const orcishOpenAIService = new OrcishOpenAIService({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletion(prompt: string, model: CompletionModel) {
  const user = await currentUser();

  try {
    const totalUserTokens = await getTotalTokens(
      user?.emailAddresses[0].emailAddress!
    );

    if (totalUserTokens <= 0) {
      return "Not enough tokens";
    }

    const { text } = await generateText({
      model: openai(model),
      prompt,
    });

    await db.insert(tokenSpends).values({
      amount: 1,
      email: user?.emailAddresses[0].emailAddress!,
      action: "completion",
    });

    return text;
  } catch (e) {
    throw e;
  }
}

export async function getImage(
  prompt: string,
  model: ImageModel,
  resolution: Resolution
) {
  const user = await currentUser();

  try {
    const totalUserTokens = await getTotalTokens(
      user?.emailAddresses[0].emailAddress!
    );

    if (totalUserTokens <= 0) {
      return "Not enough tokens";
    }

    const { image } = await generateImage({
      model: openai.image(model),
      prompt,
      size: resolution,
    });

    await db.insert(tokenSpends).values({
      amount: 1,
      email: user?.emailAddresses[0].emailAddress!,
      action: "image",
    });

    return image.base64;
  } catch (e) {
    throw e;
  }
}

export async function getTextToSpeech(
  prompt: string,
  model: VoiceModel,
  voice: Voice
) {
  const user = await currentUser();

  try {
    const totalUserTokens = await getTotalTokens(
      user?.emailAddresses[0].emailAddress!
    );

    if (totalUserTokens <= 0) {
      return "Not enough tokens";
    }

    const sound = await orcishOpenAIService.textToSpeech(prompt, {
      voiceModel: model,
      voice: voice,
    });

    const fileName = createFileName(prompt);

    // TODO: save all text to voice files on cloud (supabase or something else)
    const outputPath = `/tts/${fileName}.mp3`;
    const _output = path.resolve(outputPath);

    const soundBuffer = await sound.arrayBuffer();
    const buffer = Buffer.from(soundBuffer);
    await fs.promises.writeFile(`./public/${_output}`, buffer);

    await db.insert(tokenSpends).values({
      amount: 1,
      email: user?.emailAddresses[0].emailAddress!,
      action: "image",
    });

    return outputPath;
  } catch (e) {
    throw e;
  }
}
