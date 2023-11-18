import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const prismaRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) =>
      ctx.prisma.cVE.findUnique({
        where: {
          id: input.id,
        },
      })
    ),
  getMany: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(({ input, ctx }) =>
      ctx.prisma.cVE.findMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      })
    ),
});
