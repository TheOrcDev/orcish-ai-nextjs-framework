"use client";

import { useState } from "react";
import { Method } from "@/components/shared/types";

// import { useSession } from "next-auth/react";

import {
  OpenAIImage,
  OpenAICompletion,
  TextToSpeech,
} from "@/components/features";

import { Button } from "@/components/ui";

const methods = Object.values(Method);

export default function AISelector() {
  // const { status } = useSession();

  const [methodSelected, setMethodSelected] = useState<Method>(
    Method.Completion
  );

  // Uncomment for turning the auth on
  // if (status !== "authenticated") {
  //   return (
  //     <a href="/api/auth/signin">
  //       <Button>Login</Button>
  //     </a>
  //   );
  // }

  return (
    <div className="flex flex-col gap-5 md:w-1/2">
      <div className="flex justify-center gap-5">
        {methods.map((method) => (
          <Button
            key={method}
            variant={"outline"}
            onClick={() => setMethodSelected(method)}
            className={`${
              methodSelected === method &&
              "bg-black text-white dark:bg-gray-800"
            }`}
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
