import { aqRouter } from "./router/aq";
import { locationRouter } from "./router/location";
import { springRouter } from "./router/spring";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  spring: springRouter,
  location: locationRouter,
  aq: aqRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
