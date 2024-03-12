import { gptRouter } from "./routers/gpt";
import { router } from "./trpc";

export const appRouter = router({
  gpt: gptRouter,
});

export type AppRouter = typeof appRouter;
