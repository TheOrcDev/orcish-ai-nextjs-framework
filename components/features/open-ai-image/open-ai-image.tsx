"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageModel, Resolution } from "@/lib/types";
import { getImage } from "@/server/ai";

const imageModelsArray = Object.values(ImageModel);
const resolutionsArray = Object.values(Resolution);

export default function OpenAIImage() {
  const [imageResult, formAction, isLoading] = useActionState(getImage, null);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-3 rounded-xl"
    >
      <div className="flex gap-2">
        <Select defaultValue={ImageModel.DALL_E_3} name="model">
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {imageModelsArray.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue={Resolution.LANDSCAPE} name="resolution">
          <SelectTrigger>
            <SelectValue placeholder="Select a resolution" />
          </SelectTrigger>
          <SelectContent>
            {resolutionsArray.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea rows={6} placeholder="Your image prompt..." name="prompt" />

      <Button variant={"outline"} type="submit">
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Get Image"}
      </Button>

      {imageResult && (
        <Image
          alt={"AI Image"}
          height={1000}
          width={1000}
          src={`data:image/jpeg;base64,${imageResult.values.image}`}
        />
      )}
    </form>
  );
}
