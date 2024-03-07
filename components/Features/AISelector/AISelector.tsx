"use client";

import { useState } from "react";
// import { useSession } from "next-auth/react";

import { OpenAIImage, OpenAICompletion, Button } from "@/components";

enum Method {
  Completion = "completion",
  Image = "image",
}

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
      <div className="flex gap-5 justify-center">
        <Button
          variant={"outline"}
          onClick={() => setMethodSelected(Method.Completion)}
          className={`${
            methodSelected === Method.Completion && "bg-black text-white"
          }`}
        >
          Completion
        </Button>

        <Button
          variant={"outline"}
          onClick={() => setMethodSelected(Method.Image)}
          className={`${
            methodSelected === Method.Image && "bg-black text-white"
          }`}
        >
          Image
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        {methodSelected === Method.Completion && <OpenAICompletion />}
        {methodSelected === Method.Image && <OpenAIImage />}
      </div>
    </>
  );
}
