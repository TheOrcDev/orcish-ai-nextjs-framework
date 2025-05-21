"use client";

import { useState } from "react";

import {
  OpenAICompletion,
  OpenAIImage,
  TextToSpeech,
} from "@/components/features";
import { Method } from "@/components/shared/types";
import { Button } from "@/components/ui/button";

const methods = Object.values(Method);

export default function AISelector() {
  const [methodSelected, setMethodSelected] = useState<Method>(
    Method.Completion
  );

  return (
    <div className="flex flex-col gap-5 md:w-1/2">
      <div className="flex justify-center gap-5">
        {methods.map((method) => (
          <Button
            key={method}
            variant={"outline"}
            onClick={() => setMethodSelected(method)}
            disabled={methodSelected === method}
          >
            {method}
          </Button>
        ))}
      </div>
      {methodSelected === Method.Completion && <OpenAICompletion />}
      {methodSelected === Method.Image && <OpenAIImage />}
      {methodSelected === Method.TTS && <TextToSpeech />}
    </div>
  );
}
