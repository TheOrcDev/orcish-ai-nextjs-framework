"use client";

import { Loader2 } from "lucide-react";
import React, { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CompletionModel } from "@/lib/types";
import { getCompletion } from "@/server/ai";

const completionModelsArray = Object.values(CompletionModel);

export default function OpenAICompletion() {
  const [completionResult, formAction, isLoading] = useActionState(
    getCompletion,
    null
  );

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-3 rounded-xl"
    >
      <Label>Model</Label>
      <Select name="model" defaultValue={CompletionModel.GPT_3_5_TURBO}>
        <SelectTrigger className="w-max">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {completionModelsArray.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {completionResult?.errors?.model && (
        <p className="text-destructive">{completionResult.errors?.model}</p>
      )}

      <Label>Prompt</Label>
      <Textarea
        rows={6}
        name="prompt"
        placeholder="Your completion prompt..."
      />
      {completionResult?.errors.prompt && (
        <p className="text-destructive">{completionResult.errors.prompt}</p>
      )}

      <Button variant={"outline"} type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Get Completion"
        )}
      </Button>

      {completionResult?.values.text === "Not enough tokens" ? (
        <p>Not enough tokens</p>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: completionResult?.values.text || "",
          }}
        />
      )}
    </form>
  );
}
