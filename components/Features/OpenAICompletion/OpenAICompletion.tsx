"use client";

import React, { useState } from "react";

import { getOpenAICompletion } from "@/lib/gpt";
import { enter } from "@/lib/events";

import { Button, Loading, Textarea } from "@/components";

const prompt = (subject: string) => {
  return `${subject}`;
};

export default function OpenAICompletion() {
  const [subject, setSubject] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChatGpt = async () => {
    try {
      setLoading(true);

      const result = await getOpenAICompletion(prompt(subject));

      setLoading(false);
      setAiResult(result);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl items-center">
      <Textarea
        className="p-3 dark:text-black w-96 rounded-xl"
        rows={4}
        value={subject}
        placeholder="Your subject..."
        onChange={(e) => setSubject(e.target.value)}
        onKeyDown={(e) => enter(e, handleChatGpt)}
      ></Textarea>
      <Button onClick={handleChatGpt}>Get Result</Button>
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
