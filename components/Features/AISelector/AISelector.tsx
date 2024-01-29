"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { OpenAIImage, OpenAICompletion, OButton } from "@/components";

type Method = "completion" | "image";

export default function AISelector() {
  const { status } = useSession();

  const [methodSelected, setMethodSelected] = useState<Method>("completion");

  if (status !== "authenticated") {
    return <h2>Login</h2>;
  }

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
