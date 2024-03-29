import { z } from "zod";
import { env } from "../../../env.mjs";
import { Published } from "../../../types/v5-cve";
import { toCve } from "../../../utils/getCve";

import { createTRPCRouter, publicProcedure } from "../trpc";

const API_BASE_URL = env.API_BASE_URL;

export const apiRouter = createTRPCRouter({
  getCVE: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) =>
      fetch(`${API_BASE_URL}cve?id=` + input.id).then((res) => res.json())
    ),
  getRecentCVE: publicProcedure
    .input(z.object({ count: z.number() }))
    .query(({ input }) =>
      fetch(`${API_BASE_URL}recent?count=` + input.count).then((res) =>
        res.json().then((data) => {
          if (!Array.isArray(data)) return undefined;
          return data.map((item) => toCve(item));
        })
      )
    ),
});
