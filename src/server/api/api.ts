import { createTRPCRouter, publicProcedure } from "./trpc";
import { z } from "zod";
import { Rejected } from "../../types/v5-cve";
import { Published } from "../../types/v5-cve";
import { env } from "../../env.mjs";

const API_BASE_URL = env.API_BASE_URL;

export const appRouter = createTRPCRouter({
  getCVE: publicProcedure
    .input(z.object({ id: z.string() }))
    .query<Published | Rejected>(({ input }) => getCVE(input.id)),
  getCVEs: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query<(Published | Rejected)[]>(({ input }) => getCVEs(input.ids)),
  getRecentCVE: publicProcedure
    .input(z.object({ count: z.number() }))
    .query<(Published | Rejected)[]>(({ input }) => getRecentCVE(input.count)),
});

export async function getCVE(id: string) {
  const result = await fetch(`${API_BASE_URL}cve/v1/cve?id=` + id);
  return await result.json();
}

export async function getCVEs(ids: string[]) {
  if (ids.length === 0) return [];
  let result = await fetch(`${API_BASE_URL}cve/v1/cves?ids=` + ids.join(","));
  return result.json();
}

export async function getRecentCVE(count: number) {
  const result = await fetch(`${API_BASE_URL}cve/v1/recent?count=` + count);
  return result.json();
}

export type AppRouter = typeof appRouter;
