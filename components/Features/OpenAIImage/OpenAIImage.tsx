"use client";

import React, { useState } from "react";
import Image from "next/image";

import { trpc } from "@/server/client";
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

const imageModelsArray = Object.values(ImageModel);

export default function OpenAIImage() {
  const [prompt, setPrompt] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageModel, setSelectedImageModel] = useState<ImageModel>(
    ImageModel.DALL_E_3
  );

  const getImage = trpc.gpt.image.useMutation();

  const handleChatGpt = async () => {
    try {
      setLoading(true);
      const image = await getImage.mutateAsync({
        prompt: prompt,
        model: selectedImageModel,
      });
      setAiResult(image);
      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
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
        Get Image
      </Button>
      {loading && <Loading />}
      {aiResult && (
        <Image alt={"AI Image"} height={1000} width={1000} src={aiResult} />
      )}
    </div>
  );
}
