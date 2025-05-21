"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Voice, VoiceModel } from "@/components/shared/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getTextToSpeech } from "@/server/ai";

const voiceModelsArray = Object.values(VoiceModel);
const voicesArray = Object.values(Voice);

const formSchema = z.object({
  prompt: z.string().min(2),
  model: z.nativeEnum(VoiceModel),
  voice: z.nativeEnum(Voice),
});

export default function OpenAIImage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: VoiceModel.TTS_1,
      voice: Voice.ECHO,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const tts = await getTextToSpeech(
      values.prompt,
      values.model,
      values.voice
    );
    setAiResult(tts);
    setLoading(false);
  }

  const [aiResult, setAiResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 rounded-xl"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {voiceModelsArray.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voice</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {voicesArray.map((voice) => (
                      <SelectItem key={voice} value={voice}>
                        {voice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Your image prompt..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"outline"} type="submit">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Get Voice Output"
          )}
        </Button>

        {aiResult && (
          <audio controls>
            <source src={aiResult} type={"audio/mpeg"} />
            Your browser does not support the audio element.
          </audio>
        )}
      </form>
    </Form>
  );
}
