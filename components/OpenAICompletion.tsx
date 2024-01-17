"use client";

import React, { useState } from "react";
import { Loading } from ".";
import { getOpenAICompletion } from "@/lib/gpt";
import OButton from "./ui/OButton/OButton";

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

  const enter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleChatGpt();
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl items-center">
      <input
        type="text"
        className="p-3 dark:text-black w-96 rounded-xl"
        value={subject}
        placeholder="Your subject..."
        onChange={(e) => setSubject(e.target.value)}
        onKeyDown={enter}
      />
      <OButton onClick={handleChatGpt}>Get Result</OButton>
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
