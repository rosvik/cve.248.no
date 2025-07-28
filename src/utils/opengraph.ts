import { z } from "zod";
import { Reference } from "../types/v5-cve";

export const OpenGraphData = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});
export type OpenGraphData = z.infer<typeof OpenGraphData>;

type OpenGraphDataResponse = Array<{
  property: string;
  content: string;
}>;

export async function injectOpengraphData(
  references: Reference[]
): Promise<void> {
  references.forEach(async (reference) => {
    if (!reference.url) return;
    const result = await fetch(`https://og.248.no/api?url=${reference.url}`);
    const data = (await result.json()) as OpenGraphDataResponse;

    const title = data.find((d) => d.property === "og:title")?.content;
    const description = data.find(
      (d) => d.property === "og:description"
    )?.content;
    const image = data.find((d) => d.property === "og:image")?.content;

    if (!title && !description && !image) return;

    reference.openGraphData = {
      title,
      description,
      image,
    };
  });
}
