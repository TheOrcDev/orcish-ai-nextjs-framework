"use client";

import { OpenAIImage, OpenAICompletion } from "@/components";
import OButton from "@/components/ui/OButton/OButton";
import { useState } from "react";

type Method = "completion" | "image";

export default function AISelector() {
  const [methodSelected, setMethodSelected] = useState<Method>("completion");

  return (
    <>
      <div className="flex gap-5 justify-center">
        <OButton
          onClick={() => setMethodSelected("completion")}
          active={methodSelected === "completion"}
        >
          Completion
        </OButton>

        <OButton
          onClick={() => setMethodSelected("image")}
          active={methodSelected === "image"}
        >
          Image
        </OButton>
      </div>
      <div className="flex flex-col gap-5">
        {methodSelected === "completion" && <OpenAICompletion />}
        {methodSelected === "image" && <OpenAIImage />}
      </div>
    </>
  );
}
