"use client";

import { useState } from "react";
// import { useSession } from "next-auth/react";

import {
  OpenAIImage,
  OpenAICompletion,
  Button,
  TextToSpeech,
} from "@/components";

enum Method {
  Completion = "Completion",
  Image = "Image",
  TTS = "Text to Speech",
}

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
    <>
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
      <div className="flex flex-col gap-5">
        {methodSelected === Method.Completion && <OpenAICompletion />}
        {methodSelected === Method.Image && <OpenAIImage />}
        {methodSelected === Method.TTS && <TextToSpeech />}
      </div>
    </>
  );
}
