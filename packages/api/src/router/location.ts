import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const locationRouter = createTRPCRouter({
  getLatestLocation: publicProcedure.query(({ ctx }) => {
    return ctx.db.location.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  findLocation: publicProcedure
    .input(z.object({ latitude: z.number(), longitude: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.location.findFirst({
        where: {
          latitude: input.latitude,
          longitude: input.longitude,
        },
      });
    }),
});
