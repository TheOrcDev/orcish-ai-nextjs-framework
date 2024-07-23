"use client";

import React, { useState } from "react";

import { trpc } from "@/server/client";
import { enter } from "@/lib/events";

import { Voice, VoiceModel } from "@/components/shared/types";

import {
  Button,
  DropdownMenuTrigger,
  Loading,
  Textarea,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui";

const voiceModelsArray = Object.values(VoiceModel);
const voicesArray = Object.values(Voice);

export default function OpenAIImage() {
  const [text, setText] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState<VoiceModel>(
    VoiceModel.TTS_1
  );
  const [selectedVoice, setSelectedVoice] = useState<Voice>(Voice.ECHO);
  const voice = trpc.ai.voice.useMutation();

  const handleChatGpt = async () => {
    try {
      setAiResult("");
      setLoading(true);
      const tts = await voice.mutateAsync({
        prompt: text,
        model: selectedVoiceModel,
        voice: selectedVoice,
      });
      setAiResult(tts);
      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selectedVoiceModel}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {voiceModelsArray.map((model) => (
              <DropdownMenuItem
                key={model}
                onClick={() => setSelectedVoiceModel(model)}
                className={`${
                  selectedVoiceModel === model &&
                  "bg-gray-100 dark:bg-gray-800 dark:text-white"
                }`}
              >
                {model}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selectedVoice}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {voicesArray.map((voice) => (
              <DropdownMenuItem
                key={voice}
                onClick={() => setSelectedVoice(voice)}
                className={`${
                  selectedVoice === voice &&
                  "bg-gray-100 dark:bg-gray-800 dark:text-white "
                }`}
              >
                {voice}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Textarea
        rows={6}
        value={text}
        placeholder="Your text to speech prompt..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => enter(e, handleChatGpt)}
      ></Textarea>
      <Button variant={"outline"} onClick={handleChatGpt}>
        Get Voice Output
      </Button>
      {loading && <Loading />}
      {aiResult && (
        <audio controls>
          <source src={aiResult} type={"audio/mpeg"} />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
