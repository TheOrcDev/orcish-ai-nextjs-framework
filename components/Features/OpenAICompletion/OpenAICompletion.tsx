"use client";

import React, { useEffect, useState } from "react";
import { trpc } from "@/server/client";

import { enter } from "@/lib/events";

import { CompletionModel } from "@/components/shared/types";

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

const completionModelsArray = Object.values(CompletionModel);

export default function OpenAICompletion() {
  const [subject, setSubject] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCompletionModel, setSelectedCompletionModel] =
    useState<CompletionModel>(CompletionModel.GPT_3_5_TURBO);
  const [finalPrompt, setFinalPrompt] = useState<string>("");

  const getCompletion = trpc.gpt.completion.useQuery(
    {
      prompt: prompt(finalPrompt),
      model: selectedCompletionModel,
    },
    {
      initialData: "",
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (getCompletion.data) {
      setLoading(false);
      setAiResult(getCompletion.data);
    }
  }, [getCompletion.data]);

  const handleChatGpt = async () => {
    try {
      setLoading(true);
      setFinalPrompt(prompt(subject));
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{selectedCompletionModel}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {completionModelsArray.map((model) => (
            <DropdownMenuItem
              key={model}
              onClick={() => setSelectedCompletionModel(model)}
              className={`${
                selectedCompletionModel === model &&
                "dark:bg-gray-800 dark:text-white bg-gray-100 "
              }`}
            >
              {model}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Textarea
        className="p-3 w-96 rounded-xl"
        rows={4}
        value={subject}
        placeholder="Your subject..."
        onChange={(e) => setSubject(e.target.value)}
        onKeyDown={(e) => enter(e, handleChatGpt)}
      ></Textarea>
      <Button variant={"outline"} onClick={handleChatGpt}>
        Get Completion
      </Button>
      {loading && <Loading />}
      {aiResult && (
        <div
          className="dark:text-white mt-5"
          dangerouslySetInnerHTML={{ __html: aiResult }}
        />
      )}
    </div>
  );
}
