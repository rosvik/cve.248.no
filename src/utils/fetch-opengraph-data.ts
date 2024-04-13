import { Reference } from "../types/v5-cve";

export type OpenGraphData = {
  title: string | null;
  description: string | null;
  image: string | null;
};

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
      title: title || null,
      description: description || null,
      image: image || null,
    };
  });
}
