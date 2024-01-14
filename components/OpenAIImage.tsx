"use client";

import React, { useState } from "react";
import { Loading } from ".";
import { getOpenAIImage } from "@/lib/gpt";
import Image from "next/image";
import FButton from "./ui/FButton/FButton";

const prompt = (subject: string) => {
  return `${subject}`;
};

export default function OpenAIImage() {
  const [subject, setSubject] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChatGpt = async () => {
    try {
      setLoading(true);

      const result = await getOpenAIImage(prompt(subject));

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
      <FButton onClick={handleChatGpt}>Get Image</FButton>
      {loading && <Loading />}
      {aiResult && (
        <Image alt={"AI Image"} height={1000} width={1000} src={aiResult} />
      )}
    </div>
  );
}
