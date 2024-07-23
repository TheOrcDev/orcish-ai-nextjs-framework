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
} from "@/components/ui";
import { ImageModel, Resolution } from "@/components/shared/types";

const imageModelsArray = Object.values(ImageModel);
const resolutionsArray = Object.values(Resolution);

export default function OpenAIImage() {
  const [prompt, setPrompt] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageModel, setSelectedImageModel] = useState<ImageModel>(
    ImageModel.DALL_E_3
  );
  const [selectedResolution, setSelectedResolution] = useState<Resolution>(
    Resolution.LANDSCAPE
  );

  const getImage = trpc.ai.image.useMutation();

  const handleChatGpt = async () => {
    try {
      setLoading(true);
      const image = await getImage.mutateAsync({
        prompt: prompt,
        model: selectedImageModel,
        resolution: selectedResolution,
      });
      setAiResult(image);
      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selectedImageModel}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {imageModelsArray.map((model) => (
              <DropdownMenuItem
                key={model}
                onClick={() => setSelectedImageModel(model)}
                className={`${
                  selectedImageModel === model &&
                  "bg-gray-100 dark:bg-gray-800 dark:text-white"
                }`}
              >
                {model}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selectedResolution}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {resolutionsArray.map((resolution) => (
              <DropdownMenuItem
                key={resolution}
                onClick={() => setSelectedResolution(resolution)}
                className={`${
                  selectedResolution === resolution &&
                  "bg-gray-100 dark:bg-gray-800 dark:text-white"
                }`}
              >
                {resolution}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Textarea
        rows={6}
        value={prompt}
        placeholder="Your image prompt..."
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
