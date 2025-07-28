import { createTRPCRouter, publicProcedure } from "./trpc";
import { z } from "zod";
import { Published } from "../../types/v5-cve";
import { env } from "../../env.mjs";

const API_BASE_URL = env.API_BASE_URL;

export const appRouter = createTRPCRouter({
  getCVE: publicProcedure
    .input(z.object({ id: z.string() }))
    .query<Published | undefined>(({ input }) => getCVE(input.id)),
  getCVEs: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query<Published[] | undefined>(({ input }) => getCVEs(input.ids)),
  getRecentCVE: publicProcedure
    .input(z.object({ count: z.number() }))
    .query<Published[] | undefined>(({ input }) => getRecentCVEs(input.count)),
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query<Published[] | undefined>(({ input }) => search(input.query)),
});

export async function getCVE(id: string) {
  const result = await fetch(`${API_BASE_URL}cve/v1/cve?id=` + id);
  return Published.safeParse(await result.json()).data;
}

export async function getCVEs(ids: string[]) {
  if (ids.length === 0) return [];
  let result = await fetch(`${API_BASE_URL}cve/v1/cves?ids=` + ids.join(","));
  return z.array(Published).safeParse(await result.json()).data;
}

export async function getRecentCVEs(count: number) {
  const result = await fetch(`${API_BASE_URL}cve/v1/recent?count=` + count);
  return z.array(Published).safeParse(await result.json()).data;
}

export async function search(query: string) {
  const result = await fetch(`${API_BASE_URL}cve/v1/search?query=` + query);
  return z.array(Published).safeParse(await result.json()).data;
}

export type AppRouter = typeof appRouter;
