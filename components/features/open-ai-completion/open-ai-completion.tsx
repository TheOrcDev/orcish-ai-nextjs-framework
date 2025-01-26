"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CompletionModel } from "@/components/shared/types";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Loading,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { getCompletion } from "@/server/ai";

const formSchema = z.object({
  prompt: z.string().min(2),
  model: z.nativeEnum(CompletionModel),
});

const completionModelsArray = Object.values(CompletionModel);

export default function OpenAICompletion() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: CompletionModel.GPT_3_5_TURBO,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const completion = await getCompletion(values.prompt, values.model);
    setLoading(false);

    setAiResult(completion);
  }

  const [aiResult, setAiResult] = useState<string>("");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 rounded-xl"
      >
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {completionModelsArray.map((model) => (
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
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Your completion prompt..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"outline"} type="submit">
          Get Completion
        </Button>

        {loading && <Loading />}
        {aiResult && <div dangerouslySetInnerHTML={{ __html: aiResult }} />}
      </form>
    </Form>
  );
}
