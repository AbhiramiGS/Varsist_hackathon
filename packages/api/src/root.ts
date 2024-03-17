import { aqRouter } from "./router/aq";
import { locationRouter } from "./router/location";
import { springRouter } from "./router/spring";
import { wqRouter } from "./router/wq";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  spring: springRouter,
  location: locationRouter,
  aq: aqRouter,
  wq: wqRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
