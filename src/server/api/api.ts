import { createTRPCRouter, publicProcedure } from "./trpc";
import { z } from "zod";
import { Rejected } from "../../types/v5-cve";
import { Published } from "../../types/v5-cve";
import { env } from "../../env.mjs";

const API_BASE_URL = env.API_BASE_URL;

export const appRouter = createTRPCRouter({
  getCVE: publicProcedure
    .input(z.object({ id: z.string() }))
    .query<Published | Rejected>(async ({ input }) => {
      const result = await fetch(`${API_BASE_URL}cve/v1/cve?id=` + input.id);
      return await result.json();
    }),
  getCVEs: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query<(Published | Rejected)[]>(async ({ input }) => {
      if (input.ids.length === 0) return [];
      let result = await fetch(
        `${API_BASE_URL}cve/v1/cves?ids=` + input.ids.join(",")
      );
      return result.json();
    }),
  getRecentCVE: publicProcedure
    .input(z.object({ count: z.number() }))
    .query<(Published | Rejected)[]>(async ({ input }) => {
      const result = await fetch(
        `${API_BASE_URL}cve/v1/recent?count=` + input.count
      );
      return result.json();
    }),
});

export type AppRouter = typeof appRouter;
