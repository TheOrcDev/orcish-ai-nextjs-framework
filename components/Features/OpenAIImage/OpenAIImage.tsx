"use client";

import React, { useState } from "react";
import Image from "next/image";

import { getOpenAIImage } from "@/lib/gpt";
import { enter } from "@/lib/events";

import {
  Button,
  DropdownMenuTrigger,
  Loading,
  Textarea,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components";
import { ImageModel } from "@/components/shared/types";

const prompt = (subject: string) => {
  return `${subject}`;
};

const imageModelsArray = Object.values(ImageModel);

export default function OpenAIImage() {
  const [subject, setSubject] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageModel, setSelectedImageModel] = useState<ImageModel>(
    ImageModel.DALL_E_3
  );

  const handleChatGpt = async () => {
    try {
      setLoading(true);

      const result = await getOpenAIImage(prompt(subject));

      setAiResult(result);

      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{selectedImageModel}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {imageModelsArray.map((model) => (
            <DropdownMenuItem
              key={model}
              onClick={() => setSelectedImageModel(model)}
              className={`${
                selectedImageModel === model &&
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
        Get Image
      </Button>
      {loading && <Loading />}
      {aiResult && (
        <Image alt={"AI Image"} height={1000} width={1000} src={aiResult} />
      )}
    </div>
  );
}
