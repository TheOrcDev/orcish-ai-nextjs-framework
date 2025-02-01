import { z } from "zod";

import { CompletionModel } from "@/components/shared/types";

export const completionSchema = z.object({
    prompt: z.string().min(2),
    model: z.nativeEnum(CompletionModel),
});
