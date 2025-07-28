import { createTRPCRouter, publicProcedure } from "./trpc";
import { z } from "zod";
import { Rejected } from "../../types/v5-cve";
import { Published } from "../../types/v5-cve";
import { env } from "../../env.mjs";

const API_BASE_URL = env.API_BASE_URL;

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  getCVE: publicProcedure
    .input(z.object({ id: z.string() }))
    .query<Published | Rejected>(({ input }) =>
      fetch(`${API_BASE_URL}cve/v1/cve?id=` + input.id).then((res) =>
        res.json()
      )
    ),
  getCVEs: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query<(Published | Rejected)[]>(({ input }) =>
      fetch(`${API_BASE_URL}cve/v1/cves?ids=` + input.ids.join(",")).then(
        (res) => res.json()
      )
    ),
  getRecentCVE: publicProcedure
    .input(z.object({ count: z.number() }))
    .query<(Published | Rejected)[]>(({ input }) =>
      fetch(`${API_BASE_URL}cve/v1/recent?count=` + input.count).then((res) =>
        res.json()
      )
    ),
});

// export type definition of API
export type AppRouter = typeof appRouter;
