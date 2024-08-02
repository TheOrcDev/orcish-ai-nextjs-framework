import { router } from "./trpc";

import { aiRouter } from "./routers/ai";
import { tokensRouter } from "./routers/tokens";

export const appRouter = router({
  ai: aiRouter,
  tokens: tokensRouter,
});

export type AppRouter = typeof appRouter;
