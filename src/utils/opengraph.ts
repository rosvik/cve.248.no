import { z } from "zod";
import { Published } from "../types/v5-cve";
import { removeUndefined } from "./utils";

export const OpenGraphData = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});
export type OpenGraphData = z.infer<typeof OpenGraphData>;

export const OpenGraphDataResponse = z.array(
  z.object({
    property: z.string(),
    content: z.string(),
  })
);
export type OpenGraphDataResponse = z.infer<typeof OpenGraphDataResponse>;

export function formatOpenGraphDataResponse(
  response: OpenGraphDataResponse
): OpenGraphData {
  return {
    title: response.find((d) => d.property === "og:title")?.content,
    description: response.find((d) => d.property === "og:description")?.content,
    image: response.find((d) => d.property === "og:image")?.content,
  };
}

export function addOpenGraphData(
  cve: Published,
  openGraphData: Array<OpenGraphData & { url: string }> | undefined
): Published {
  if (!openGraphData) return cve;
  return {
    ...cve,
    containers: {
      ...cve.containers,
      cna: {
        ...cve.containers.cna,
        references: cve.containers.cna.references?.map((reference) => {
          const data = openGraphData.find((d) => d.url === reference.url);
          if (!data) return reference;
          return {
            ...reference,
            openGraphData: removeUndefined({
              title: data.title,
              description: data.description,
              image: data.image,
            }),
          };
        }),
      },
    },
  };
}
