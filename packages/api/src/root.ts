import { springRouter } from "./router/spring";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({

  spring: springRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
