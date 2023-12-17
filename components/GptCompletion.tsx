"use client";

import { getChatGPTCompletion } from "@/lib/gpt";
import React, { useState } from "react";
import { Loading } from ".";

const prompt = (subject: string) => {
  return `Prompt text goes here about ${subject}`;
};

export default function GptCompletion() {
  const [subject, setSubject] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChatGpt = async () => {
    try {
      setLoading(true);

      const result = await getChatGPTCompletion(prompt(subject));

      setLoading(false);
      setAiResult(result);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 rounded-xl items-center mb-10">
        <input
          type="text"
          className="p-3 text-black w-96"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button
          className="p-3 bg-white text-black rounded-xl w-40"
          onClick={handleChatGpt}
        >
          Get Result
        </button>
      </div>
      {loading && <Loading />}
      {aiResult && (
        <div
          className="text-white"
          dangerouslySetInnerHTML={{ __html: aiResult }}
        />
      )}
    </>
  );
}
