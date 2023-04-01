import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getCVE: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const cve = ctx.prisma.cVE.findFirst({
        where: {
          id: input.id,
        },
      });
      return cve;
    }),
  getRecentCVE: publicProcedure.query(({ input, ctx }) => {
    const cve = ctx.prisma.cVE.findMany({
      orderBy: {
        id: "desc",
      },
      take: 10,
    });
    return cve;
  }),
});
