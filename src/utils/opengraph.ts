import { z } from "zod";
import { Published } from "../types/v5-cve";
import { isDefined, removeUndefined } from "./utils";
import { GithubAdvisory } from "../types/GithubAdvisory";

export const OpenGraphData = z.object({
  url: z.string(),
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
  response: OpenGraphDataResponse,
  url: string
): OpenGraphData {
  return {
    url,
    title: response.find((d) => d.property === "og:title")?.content,
    description: response.find((d) => d.property === "og:description")?.content,
    image: response.find((d) => d.property === "og:image")?.content,
  };
}

export function addCveOpenGraphData(
  cve: Published,
  openGraphData: Array<OpenGraphData> | undefined
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
              url: data.url,
              title: data.title,
              description: data.description,
              image: data.image,
            }) as OpenGraphData,
          };
        }),
      },
    },
  };
}

export function addGithubAdvisoryOpenGraphData(
  advisory: GithubAdvisory,
  openGraphData: Array<OpenGraphData & { url: string }> | undefined
): GithubAdvisory {
  const openGraphDataItems = advisory.references
    ?.map((advisoryReference: string) => {
      const ogdItem = openGraphData?.find((d) => d.url === advisoryReference);
      return {
        url: advisoryReference,
        openGraphData: ogdItem,
      };
    })
    .filter(isDefined);
  return {
    ...advisory,
    openGraphData: openGraphDataItems,
  };
}
