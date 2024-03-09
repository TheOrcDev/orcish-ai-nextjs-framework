"use client";

import React, { useState } from "react";

import { getOpenAICompletion } from "@/lib/gpt";
import { enter } from "@/lib/events";

import { CompletionModel } from "@/components/shared/types";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

import {
  Button,
  DropdownMenuTrigger,
  Loading,
  Textarea,
  DropdownMenuContent,
  DropdownMenuItem,
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
    useState<CompletionModel>(CompletionModel.GPT_4);

  const handleChatGpt = async () => {
    try {
      setLoading(true);

      const result = await getOpenAICompletion(
        prompt(subject),
        selectedCompletionModel
      );

      setLoading(false);
      setAiResult(result);
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
        Get Result
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
