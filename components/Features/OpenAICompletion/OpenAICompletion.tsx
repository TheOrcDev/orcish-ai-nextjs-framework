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

const completionModelsArray = Object.values(CompletionModel);

export default function OpenAICompletion() {
  const [prompt, setPrompt] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCompletionModel, setSelectedCompletionModel] =
    useState<CompletionModel>(CompletionModel.GPT_3_5_TURBO);

  const getCompletion = trpc.gpt.completion.useMutation();

  const handleChatGpt = async () => {
    try {
      setLoading(true);
      const completion = await getCompletion.mutateAsync({
        prompt,
        model: selectedCompletionModel,
      });
      setLoading(false);
      setAiResult(completion);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl">
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
                "bg-gray-100 dark:bg-gray-800 dark:text-white "
              }`}
            >
              {model}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Textarea
        className="w-96 rounded-xl p-3"
        rows={4}
        value={prompt}
        placeholder="Your prompt..."
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => enter(e, handleChatGpt)}
      ></Textarea>
      <Button variant={"outline"} onClick={handleChatGpt}>
        Get Completion
      </Button>
      {loading && <Loading />}
      {aiResult && (
        <div
          className="mt-5 dark:text-white"
          dangerouslySetInnerHTML={{ __html: aiResult }}
        />
      )}
    </div>
  );
}
