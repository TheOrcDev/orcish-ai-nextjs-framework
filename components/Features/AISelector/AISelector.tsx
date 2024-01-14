"use client";

import { OpenAIImage, OpenAICompletion } from "@/components";
import FButton from "@/components/ui/FButton/FButton";
import { useState } from "react";

type method = "completion" | "image";

export default function AISelector() {
  const [methodSelected, setMethodSelected] = useState<method>("completion");

  return (
    <>
      <div className="flex gap-5 justify-center">
        <FButton
          onClick={() => setMethodSelected("completion")}
          active={methodSelected === "completion"}
        >
          Completion
        </FButton>

        <FButton
          onClick={() => setMethodSelected("image")}
          active={methodSelected === "image"}
        >
          Image
        </FButton>
      </div>
      <div className="flex flex-col gap-5">
        {methodSelected === "completion" && <OpenAICompletion />}
        {methodSelected === "image" && <OpenAIImage />}
      </div>
    </>
  );
}
