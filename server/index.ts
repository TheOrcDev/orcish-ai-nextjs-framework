import { aiRouter } from "./routers/ai";
import { router } from "./trpc";

export const appRouter = router({
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
