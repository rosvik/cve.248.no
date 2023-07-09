import { z } from "zod";
import { getCve, toCve } from "../../../utils/getCve";

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
  getRecentCVE: publicProcedure
    .input(z.object({ count: z.number() }))
    .query(({ input, ctx }) => {
      console.log(input);
      const cve = ctx.prisma.cVE
        .findMany({
          orderBy: {
            id: "desc",
          },
          take: input.count,
        })
        .then((cves) => cves.map((c) => toCve(c.json)));

      return cve;
    }),
});
