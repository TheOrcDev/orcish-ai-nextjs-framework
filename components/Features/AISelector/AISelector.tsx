"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { OpenAIImage, OpenAICompletion, OButton } from "@/components";

enum Method {
  Completion = "completion",
  Image = "image",
}

export default function AISelector() {
  const { status } = useSession();

  const [methodSelected, setMethodSelected] = useState<Method>(
    Method.Completion
  );

  if (status !== "authenticated") {
    return (
      <a href="/api/auth/signin">
        <OButton>Login</OButton>
      </a>
    );
  }

  return (
    <>
      <div className="flex gap-5 justify-center">
        <OButton
          onClick={() => setMethodSelected(Method.Completion)}
          active={methodSelected === Method.Completion}
        >
          Completion
        </OButton>

        <OButton
          onClick={() => setMethodSelected(Method.Image)}
          active={methodSelected === Method.Image}
        >
          Image
        </OButton>
      </div>
      <div className="flex flex-col gap-5">
        {methodSelected === Method.Completion && <OpenAICompletion />}
        {methodSelected === Method.Image && <OpenAIImage />}
      </div>
    </>
  );
}
