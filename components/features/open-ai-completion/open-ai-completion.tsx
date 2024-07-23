"use client";

import React, { useState } from "react";
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
} from "@/components/ui";

const completionModelsArray = Object.values(CompletionModel);

export default function OpenAICompletion() {
  const [prompt, setPrompt] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCompletionModel, setSelectedCompletionModel] =
    useState<CompletionModel>(CompletionModel.GPT_3_5_TURBO);

  const getCompletion = trpc.ai.completion.useMutation();

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
      console.error("Error fetching AI completion:", e);
      setAiResult("Failed to fetch AI completion. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{selectedCompletionModel}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {completionModelsArray.map((model) => (
            <DropdownMenuItem
              key={model}
              onClick={() => setSelectedCompletionModel(model)}
              className={`${
                selectedCompletionModel === model &&
                "bg-gray-100 dark:bg-gray-800 dark:text-white"
              }`}
            >
              {model}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Textarea
        rows={6}
        value={prompt}
        placeholder="Your completion prompt..."
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => enter(e, handleChatGpt)}
      />
      <Button variant={"outline"} onClick={handleChatGpt}>
        Get Completion
      </Button>
      {loading && <Loading />}
      {aiResult && <div dangerouslySetInnerHTML={{ __html: aiResult }} />}
    </div>
  );
}
