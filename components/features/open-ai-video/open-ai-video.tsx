"use client";

import { Loader2 } from "lucide-react";
import React, { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getVideo } from "@/server/ai";

export default function OpenAIVideo() {
  const [videoResult, formAction, isLoading] = useActionState(getVideo, null);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-3 rounded-xl"
    >
      <Textarea rows={6} placeholder="Your video prompt..." name="prompt" />

      <Button variant={"outline"} type="submit">
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Get Video"}
      </Button>

      {videoResult && (
        <video
          height={1000}
          width={1000}
          src={videoResult.values.video}
          controls
        />
      )}
    </form>
  );
}
