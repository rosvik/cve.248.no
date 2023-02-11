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
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getCVE: publicProcedure.query(({ ctx }) => {
    const CVE = ctx.prisma.t.findFirst({
      where: {
        Name: " CVE-2005-3006",
      },
    });
    return CVE;
  }),
});
