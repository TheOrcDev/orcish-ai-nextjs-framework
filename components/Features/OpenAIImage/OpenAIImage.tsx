"use client";

import React, { useState } from "react";
import Image from "next/image";

import { getOpenAIImage } from "@/lib/gpt";
import { enter } from "@/lib/events";

import { OButton, Loading } from "@/components";

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

      setAiResult(result);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl items-center">
      <textarea
        className="p-3 dark:text-black w-96 rounded-xl"
        rows={4}
        value={subject}
        placeholder="Your subject..."
        onChange={(e) => setSubject(e.target.value)}
        onKeyDown={(e) => enter(e, handleChatGpt)}
      ></textarea>
      <OButton onClick={handleChatGpt}>Get Image</OButton>
      {loading && <Loading />}
      {aiResult && (
        <Image alt={"AI Image"} height={1000} width={1000} src={aiResult} />
      )}
    </div>
  );
}
