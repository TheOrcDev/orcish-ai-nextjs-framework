"use client";

import { OpenAIImage, OpenAICompletion } from "@/components";
import { useState } from "react";

type method = "completion" | "image";

export default function AISelector() {
  const [methodSelected, setMethodSelected] = useState<method>("completion");

  return (
    <>
      <div className="flex gap-5 justify-center">
        <button
          onClick={() => setMethodSelected("completion")}
          className={`p-3 bg-white dark:text-black rounded-xl w-40 ${
            methodSelected === "completion" && "bg-orange-100"
          }`}
        >
          Completion
        </button>

        <button
          onClick={() => setMethodSelected("image")}
          className={`p-3 bg-white dark:text-black rounded-xl w-40 ${
            methodSelected === "image" && "bg-orange-100"
          }`}
        >
          Image
        </button>
      </div>
      {methodSelected === "completion" && (
        <div className="flex flex-col gap-5">
          <OpenAICompletion />
        </div>
      )}
      {methodSelected === "image" && (
        <div className="flex flex-col gap-5">
          <OpenAIImage />
        </div>
      )}
    </>
  );
}
