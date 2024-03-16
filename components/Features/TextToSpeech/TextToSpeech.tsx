"use client";

import React, { useEffect, useState } from "react";

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
} from "@/components";

const prompt = (subject: string) => {
  return `${subject}`;
};

const voiceModelsArray = Object.values(VoiceModel);
const voicesArray = Object.values(Voice);

export default function OpenAIImage() {
  const [subject, setSubject] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [finalPrompt, setFinalPrompt] = useState<string>("");
  const [selectedVoiceModel, setSelectedVoiceModel] = useState<VoiceModel>(
    VoiceModel.TTS_1
  );
  const [selectedVoice, setSelectedVoice] = useState<Voice>(Voice.ECHO);

  const getVoice = trpc.gpt.voice.useQuery(
    {
      prompt: prompt(finalPrompt),
      model: selectedVoiceModel,
      voice: selectedVoice,
    },
    {
      initialData: "",
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (getVoice.data) {
      setLoading(false);
      setAiResult(getVoice.data);
    }
  }, [getVoice.data]);

  const handleChatGpt = async () => {
    try {
      setLoading(true);
      setFinalPrompt(subject);
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
          <DropdownMenuContent align="end">
            {voiceModelsArray.map((model) => (
              <DropdownMenuItem
                key={model}
                onClick={() => setSelectedVoiceModel(model)}
                className={`${
                  selectedVoiceModel === model &&
                  "bg-gray-100 dark:bg-gray-800 dark:text-white "
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
        className="w-96 rounded-xl p-3"
        rows={4}
        value={subject}
        placeholder="Your subject..."
        onChange={(e) => setSubject(e.target.value)}
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
