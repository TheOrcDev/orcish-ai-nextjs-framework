import { z } from "zod";

import { CompletionModel, ImageModel, Resolution } from "@/components/shared/types";

export const completionSchema = z.object({
    prompt: z.string().min(2),
    model: z.nativeEnum(CompletionModel),
});

export const imageSchema = z.object({
    prompt: z.string().min(2),
    model: z.nativeEnum(ImageModel),
    resolution: z.nativeEnum(Resolution),
});
