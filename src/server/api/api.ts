import { createTRPCRouter, publicProcedure } from "./trpc";
import { z } from "zod";
import { Published } from "../../types/v5-cve";
import { env } from "../../env.mjs";
import { isDefined } from "../../utils/utils";
import {
  formatOpenGraphDataResponse,
  OpenGraphData,
  OpenGraphDataResponse,
} from "../../utils/opengraph";

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
  getOpenGraphData: publicProcedure
    .input(z.object({ urls: z.array(z.string()) }))
    .subscription(async function* (opts) {
      console.info(
        `getOpenGraphData: Starting fetch for ${opts.input.urls.length} URLs`
      );

      const promises = opts.input.urls.map(getOpenGraphData);
      let results: Array<OpenGraphData & { url: string }> = [];
      let lastYieldTime = Date.now();
      const DEBOUNCE_DELAY = 100;

      // Process promises as they complete
      for (const promise of promises) {
        const result = await promise;
        if (result) {
          results.push(result);

          // Debounce yields
          const now = Date.now();
          const shouldYield = now - lastYieldTime >= DEBOUNCE_DELAY;
          if (shouldYield) {
            console.log(`Yielding ${results.length} opengraph data items`);
            yield results;
            lastYieldTime = now;
          }
        }
      }

      // Yield any trailing results
      if (results.length > 0) {
        console.info(
          `getOpenGraphData: Yielding ${results.length} opengraph data items`
        );
        yield results;
      } else {
        console.info("getOpenGraphData: No trailing results to yield");
      }
      console.info(
        `getOpenGraphData: Fetched ${results.length} opengraph data items`
      );

      // Wait 1 second before closing the connection to let any yields complete
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
});

export async function getCVE(id: string) {
  const result = await fetch(`${API_BASE_URL}cve/v1/cve?id=` + id);
  const re = Published.safeParse(await result.json());
  if (re.error) {
    console.error(re.error);
  }
  return re.data;
}

export async function getCVEs(ids: string[]) {
  if (ids.length === 0) return [];
  let result = await fetch(`${API_BASE_URL}cve/v1/cves?ids=` + ids.join(","));
  let data = await result.json();
  if (!Array.isArray(data)) return [];
  let cves = data
    .map((item) => {
      const re = Published.safeParse(item);
      if (re.error) console.error(re.error);
      return re.data;
    })
    .filter(isDefined);
  return cves;
}

export async function getRecentCVEs(count: number): Promise<Published[]> {
  const result = await fetch(`${API_BASE_URL}cve/v1/recent?count=` + count);
  let data = await result.json();
  if (!Array.isArray(data)) return [];
  let cves = data
    .map((item) => {
      const re = Published.safeParse(item);
      if (re.error) console.error(re.error);
      return re.data;
    })
    .filter(isDefined);
  return cves;
}

export async function search(query: string) {
  const result = await fetch(`${API_BASE_URL}cve/v1/search?query=` + query);
  const re = z.array(Published).safeParse(await result.json());
  if (re.error) {
    console.error(re.error);
  }
  return re.data;
}

export async function getOpenGraphData(
  url: string
): Promise<(OpenGraphData & { url: string }) | undefined> {
  const response = await fetch(`https://og.248.no/api?url=${url}`);
  const ogdResponse = OpenGraphDataResponse.safeParse(await response.json());
  if (ogdResponse.error) console.error(ogdResponse.error);
  return ogdResponse.data
    ? { ...formatOpenGraphDataResponse(ogdResponse.data), url }
    : undefined;
}
export type AppRouter = typeof appRouter;
