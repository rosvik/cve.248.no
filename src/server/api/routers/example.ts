import { z } from "zod";
import { env } from "../../../env.mjs";
import { Published } from "../../../types/v5-cve";
import { toCve } from "../../../utils/getCve";

import { createTRPCRouter, publicProcedure } from "../trpc";

const API_BASE_URL = env.API_BASE_URL;

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
    .query(({ input }) => {
      const cve = fetch(`${API_BASE_URL}cve?id=` + input.id).then((res) =>
        res.json()
      );
      console.log(cve);
      return cve;
    }),
  getRecentCVE: publicProcedure
    .input(z.object({ count: z.number() }))
    .query(({ input }) => {
      const cves = fetch(`${API_BASE_URL}recent?count=` + input.count).then(
        (res) =>
          res.json().then((data) => {
            if (!Array.isArray(data)) return undefined;
            return data.map((item) => toCve(item));
          })
      );
      return cves;
    }),
  getManyCVEs: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(({ input }) => {
      const cves = fetch(`${API_BASE_URL}cves?ids=` + input.ids.join(",")).then(
        (res) =>
          res.json().then((data) => {
            if (!Array.isArray(data)) return undefined;
            return data
              .map((item) => toCve(item).cve)
              .filter((cve): cve is Published => !!cve);
          })
      );
      return cves;
    }),
});
