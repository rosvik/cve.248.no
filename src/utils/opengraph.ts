import { z } from "zod";

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
